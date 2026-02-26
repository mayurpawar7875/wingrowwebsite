import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Pencil, Trash2, LogOut, ShieldCheck, Store, Calendar } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Market = {
  id: string;
  city: string;
  market_name: string;
  is_active: boolean;
  created_at: string;
};

type WomenSchedule = {
  id: string;
  city: string;
  date: string;
  day: string;
  venue: string;
  slots_total: number;
  slots_remaining: number;
  is_active: boolean;
  created_at: string;
};

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const AdminPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [markets, setMarkets] = useState<Market[]>([]);
  const [womenSchedules, setWomenSchedules] = useState<WomenSchedule[]>([]);
  const [loading, setLoading] = useState(false);
  const [editMarket, setEditMarket] = useState<Market | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newCity, setNewCity] = useState("");
  const [newMarketName, setNewMarketName] = useState("");
  const [newIsActive, setNewIsActive] = useState(true);
  const [customCity, setCustomCity] = useState("");
  const [filterCity, setFilterCity] = useState("all");

  // Women schedule states
  const [showAddScheduleDialog, setShowAddScheduleDialog] = useState(false);
  const [editSchedule, setEditSchedule] = useState<WomenSchedule | null>(null);
  const [scheduleForm, setScheduleForm] = useState({ city: "", date: "", day: "", venue: "", slots_total: 40, slots_remaining: 40, is_active: true });
  const [scheduleFilterCity, setScheduleFilterCity] = useState("all");

  const storedPassword = () => sessionStorage.getItem("admin_pw") || password;
  const storedUsername = () => sessionStorage.getItem("admin_un") || username;

  const apiCall = async (method: string, body?: any, resource = "markets") => {
    const res = await supabase.functions.invoke("admin-markets", {
      method: method as any,
      headers: { "x-admin-password": storedPassword(), "x-admin-username": storedUsername() },
      body: body || undefined,
    });
    // For GET with resource param, we need query params - use a different approach
    if (res.error) throw new Error(res.error.message);
    return res.data;
  };

  const apiCallWithResource = async (method: string, resource: string, body?: any) => {
    const url = `admin-markets?resource=${resource}`;
    const res = await supabase.functions.invoke(url, {
      method: method as any,
      headers: { "x-admin-password": storedPassword(), "x-admin-username": storedUsername() },
      body: body || undefined,
    });
    if (res.error) throw new Error(res.error.message);
    return res.data;
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const data = await apiCall("GET");
      sessionStorage.setItem("admin_pw", password);
      sessionStorage.setItem("admin_un", username);
      setIsAuthenticated(true);
      setMarkets(data);
      // Also fetch women schedules
      try {
        const schedData = await apiCallWithResource("GET", "women_schedule");
        setWomenSchedules(schedData);
      } catch { /* ignore */ }
      toast.success("Logged in successfully");
    } catch {
      toast.error("Invalid credentials");
    }
    setLoading(false);
  };

  const fetchMarkets = async () => {
    try {
      const data = await apiCall("GET");
      setMarkets(data);
    } catch {
      toast.error("Failed to fetch markets");
    }
  };

  const fetchWomenSchedules = async () => {
    try {
      const data = await apiCallWithResource("GET", "women_schedule");
      setWomenSchedules(data);
    } catch {
      toast.error("Failed to fetch schedules");
    }
  };

  // Market CRUD
  const handleAdd = async () => {
    const city = newCity === "__custom" ? customCity : newCity;
    if (!city || !newMarketName.trim()) { toast.error("City and market name are required"); return; }
    try {
      await apiCall("POST", { city, market_name: newMarketName.trim(), is_active: newIsActive });
      toast.success("Market added");
      setShowAddDialog(false); setNewCity(""); setNewMarketName(""); setCustomCity(""); setNewIsActive(true);
      fetchMarkets();
    } catch { toast.error("Failed to add market"); }
  };

  const handleUpdate = async () => {
    if (!editMarket) return;
    if (!editMarket.city || !editMarket.market_name.trim()) { toast.error("City and market name are required"); return; }
    try {
      await apiCall("PUT", editMarket);
      toast.success("Market updated"); setEditMarket(null); fetchMarkets();
    } catch { toast.error("Failed to update market"); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this market?")) return;
    try { await apiCall("DELETE", { id }); toast.success("Market deleted"); fetchMarkets(); }
    catch { toast.error("Failed to delete market"); }
  };

  const handleToggleActive = async (market: Market) => {
    try {
      await apiCall("PUT", { ...market, is_active: !market.is_active });
      toast.success(market.is_active ? "Market deactivated" : "Market activated"); fetchMarkets();
    } catch { toast.error("Failed to update market"); }
  };

  // Women Schedule CRUD
  const handleAddSchedule = async () => {
    const f = scheduleForm;
    if (!f.city || !f.date || !f.day || !f.venue) { toast.error("All fields are required"); return; }
    try {
      await apiCallWithResource("POST", "women_schedule", f);
      toast.success("Schedule added");
      setShowAddScheduleDialog(false);
      setScheduleForm({ city: "", date: "", day: "", venue: "", slots_total: 40, slots_remaining: 40, is_active: true });
      fetchWomenSchedules();
    } catch { toast.error("Failed to add schedule"); }
  };

  const handleUpdateSchedule = async () => {
    if (!editSchedule) return;
    try {
      await apiCallWithResource("PUT", "women_schedule", editSchedule);
      toast.success("Schedule updated"); setEditSchedule(null); fetchWomenSchedules();
    } catch { toast.error("Failed to update schedule"); }
  };

  const handleDeleteSchedule = async (id: string) => {
    if (!confirm("Delete this schedule entry?")) return;
    try { await apiCallWithResource("DELETE", "women_schedule", { id }); toast.success("Schedule deleted"); fetchWomenSchedules(); }
    catch { toast.error("Failed to delete schedule"); }
  };

  const handleToggleScheduleActive = async (s: WomenSchedule) => {
    try {
      await apiCallWithResource("PUT", "women_schedule", { ...s, is_active: !s.is_active });
      toast.success(s.is_active ? "Deactivated" : "Activated"); fetchWomenSchedules();
    } catch { toast.error("Failed to update"); }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_pw");
    sessionStorage.removeItem("admin_un");
    setIsAuthenticated(false); setPassword(""); setUsername("");
  };

  const cities = [...new Set(markets.map((m) => m.city))].sort();
  const filteredMarkets = filterCity === "all" ? markets : markets.filter((m) => m.city === filterCity);
  const scheduleCities = [...new Set(womenSchedules.map((s) => s.city))].sort();
  const filteredSchedules = scheduleFilterCity === "all" ? womenSchedules : womenSchedules.filter((s) => s.city === scheduleFilterCity);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-muted to-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-2 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
            <p className="text-muted-foreground text-sm">Enter your credentials to continue</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input id="username" type="email" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleLogin()} placeholder="Enter password" />
            </div>
            <Button onClick={handleLogin} disabled={loading} className="w-full">{loading ? "Verifying..." : "Login"}</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-background border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Store className="h-5 w-5 text-primary" />
            <h1 className="text-lg font-bold">Wingrow Admin</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-1" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="markets">
          <TabsList className="mb-4">
            <TabsTrigger value="markets"><Store className="h-4 w-4 mr-1" /> Markets ({markets.length})</TabsTrigger>
            <TabsTrigger value="women-schedule"><Calendar className="h-4 w-4 mr-1" /> Women Schedule ({womenSchedules.length})</TabsTrigger>
          </TabsList>

          {/* Markets Tab */}
          <TabsContent value="markets" className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Select value={filterCity} onValueChange={setFilterCity}>
                <SelectTrigger className="w-[180px]"><SelectValue placeholder="Filter by city" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cities</SelectItem>
                  {cities.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
              <Button onClick={() => setShowAddDialog(true)} className="ml-auto"><Plus className="h-4 w-4 mr-1" /> Add Market</Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filteredMarkets.map((market) => (
                <Card key={market.id} className={!market.is_active ? "opacity-60" : ""}>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium">{market.market_name}</p>
                      <p className="text-sm text-muted-foreground">{market.city}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Switch checked={market.is_active} onCheckedChange={() => handleToggleActive(market)} aria-label="Toggle active" />
                      <Button variant="ghost" size="icon" onClick={() => setEditMarket({ ...market })}><Pencil className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(market.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Women Schedule Tab */}
          <TabsContent value="women-schedule" className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Select value={scheduleFilterCity} onValueChange={setScheduleFilterCity}>
                <SelectTrigger className="w-[180px]"><SelectValue placeholder="Filter by city" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cities</SelectItem>
                  {scheduleCities.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
              <Button onClick={() => setShowAddScheduleDialog(true)} className="ml-auto"><Plus className="h-4 w-4 mr-1" /> Add Schedule</Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filteredSchedules.map((s) => (
                <Card key={s.id} className={!s.is_active ? "opacity-60" : ""}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium">{s.venue}</p>
                        <p className="text-sm text-muted-foreground">{s.city} · {s.day}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Switch checked={s.is_active} onCheckedChange={() => handleToggleScheduleActive(s)} aria-label="Toggle active" />
                        <Button variant="ghost" size="icon" onClick={() => setEditSchedule({ ...s })}><Pencil className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteSchedule(s.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Badge variant="outline">{new Date(s.date).toLocaleDateString()}</Badge>
                      <Badge variant="secondary">{s.slots_remaining}/{s.slots_total} slots</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Market Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add New Market</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>City</Label>
              <Select value={newCity} onValueChange={setNewCity}>
                <SelectTrigger><SelectValue placeholder="Select city" /></SelectTrigger>
                <SelectContent>
                  {cities.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  <SelectItem value="__custom">+ Add New City</SelectItem>
                </SelectContent>
              </Select>
              {newCity === "__custom" && <Input className="mt-2" value={customCity} onChange={(e) => setCustomCity(e.target.value)} placeholder="Enter new city name" />}
            </div>
            <div><Label>Market Name</Label><Input value={newMarketName} onChange={(e) => setNewMarketName(e.target.value)} placeholder="e.g. Kharadi" /></div>
            <div className="flex items-center gap-2"><Switch checked={newIsActive} onCheckedChange={setNewIsActive} /><Label>Active</Label></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
            <Button onClick={handleAdd}>Add Market</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Market Dialog */}
      <Dialog open={!!editMarket} onOpenChange={(o) => !o && setEditMarket(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Market</DialogTitle></DialogHeader>
          {editMarket && (
            <div className="space-y-4">
              <div><Label>City</Label><Input value={editMarket.city} onChange={(e) => setEditMarket({ ...editMarket, city: e.target.value })} /></div>
              <div><Label>Market Name</Label><Input value={editMarket.market_name} onChange={(e) => setEditMarket({ ...editMarket, market_name: e.target.value })} /></div>
              <div className="flex items-center gap-2"><Switch checked={editMarket.is_active} onCheckedChange={(v) => setEditMarket({ ...editMarket, is_active: v })} /><Label>Active</Label></div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditMarket(null)}>Cancel</Button>
            <Button onClick={handleUpdate}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Schedule Dialog */}
      <Dialog open={showAddScheduleDialog} onOpenChange={setShowAddScheduleDialog}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add Women Market Schedule</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>City</Label>
              <Select value={scheduleForm.city} onValueChange={(v) => setScheduleForm({ ...scheduleForm, city: v })}>
                <SelectTrigger><SelectValue placeholder="Select city" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pune">Pune</SelectItem>
                  <SelectItem value="Mumbai">Mumbai</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div><Label>Date</Label><Input type="date" value={scheduleForm.date} onChange={(e) => {
              const d = new Date(e.target.value);
              const dayName = DAYS[d.getDay() === 0 ? 6 : d.getDay() - 1];
              setScheduleForm({ ...scheduleForm, date: e.target.value, day: dayName });
            }} /></div>
            <div><Label>Day</Label><Input value={scheduleForm.day} readOnly className="bg-muted" /></div>
            <div><Label>Venue</Label><Input value={scheduleForm.venue} onChange={(e) => setScheduleForm({ ...scheduleForm, venue: e.target.value })} placeholder="e.g. Kharadi IT Park" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Total Slots</Label><Input type="number" value={scheduleForm.slots_total} onChange={(e) => setScheduleForm({ ...scheduleForm, slots_total: parseInt(e.target.value) || 0 })} /></div>
              <div><Label>Remaining Slots</Label><Input type="number" value={scheduleForm.slots_remaining} onChange={(e) => setScheduleForm({ ...scheduleForm, slots_remaining: parseInt(e.target.value) || 0 })} /></div>
            </div>
            <div className="flex items-center gap-2"><Switch checked={scheduleForm.is_active} onCheckedChange={(v) => setScheduleForm({ ...scheduleForm, is_active: v })} /><Label>Active</Label></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddScheduleDialog(false)}>Cancel</Button>
            <Button onClick={handleAddSchedule}>Add Schedule</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Schedule Dialog */}
      <Dialog open={!!editSchedule} onOpenChange={(o) => !o && setEditSchedule(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Schedule</DialogTitle></DialogHeader>
          {editSchedule && (
            <div className="space-y-4">
              <div>
                <Label>City</Label>
                <Select value={editSchedule.city} onValueChange={(v) => setEditSchedule({ ...editSchedule, city: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pune">Pune</SelectItem>
                    <SelectItem value="Mumbai">Mumbai</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div><Label>Date</Label><Input type="date" value={editSchedule.date} onChange={(e) => {
                const d = new Date(e.target.value);
                const dayName = DAYS[d.getDay() === 0 ? 6 : d.getDay() - 1];
                setEditSchedule({ ...editSchedule, date: e.target.value, day: dayName });
              }} /></div>
              <div><Label>Day</Label><Input value={editSchedule.day} readOnly className="bg-muted" /></div>
              <div><Label>Venue</Label><Input value={editSchedule.venue} onChange={(e) => setEditSchedule({ ...editSchedule, venue: e.target.value })} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Total Slots</Label><Input type="number" value={editSchedule.slots_total} onChange={(e) => setEditSchedule({ ...editSchedule, slots_total: parseInt(e.target.value) || 0 })} /></div>
                <div><Label>Remaining Slots</Label><Input type="number" value={editSchedule.slots_remaining} onChange={(e) => setEditSchedule({ ...editSchedule, slots_remaining: parseInt(e.target.value) || 0 })} /></div>
              </div>
              <div className="flex items-center gap-2"><Switch checked={editSchedule.is_active} onCheckedChange={(v) => setEditSchedule({ ...editSchedule, is_active: v })} /><Label>Active</Label></div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditSchedule(null)}>Cancel</Button>
            <Button onClick={handleUpdateSchedule}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPage;
