import { useState, useEffect } from "react";
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
import { Plus, Pencil, Trash2, LogOut, ShieldCheck, Store } from "lucide-react";

type Market = {
  id: string;
  city: string;
  market_name: string;
  is_active: boolean;
  created_at: string;
};

const AdminPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(false);
  const [editMarket, setEditMarket] = useState<Market | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newCity, setNewCity] = useState("");
  const [newMarketName, setNewMarketName] = useState("");
  const [newIsActive, setNewIsActive] = useState(true);
  const [customCity, setCustomCity] = useState("");
  const [filterCity, setFilterCity] = useState("all");

  const storedPassword = () => sessionStorage.getItem("admin_pw") || password;
  const storedUsername = () => sessionStorage.getItem("admin_un") || username;

  const apiCall = async (method: string, body?: any) => {
    const res = await supabase.functions.invoke("admin-markets", {
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
      toast.success("Logged in successfully");
    } catch {
      toast.error("Invalid password");
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

  const handleAdd = async () => {
    const city = newCity === "__custom" ? customCity : newCity;
    if (!city || !newMarketName.trim()) {
      toast.error("City and market name are required");
      return;
    }
    try {
      await apiCall("POST", { city, market_name: newMarketName.trim(), is_active: newIsActive });
      toast.success("Market added");
      setShowAddDialog(false);
      setNewCity("");
      setNewMarketName("");
      setCustomCity("");
      setNewIsActive(true);
      fetchMarkets();
    } catch {
      toast.error("Failed to add market");
    }
  };

  const handleUpdate = async () => {
    if (!editMarket) return;
    const city = editMarket.city;
    if (!city || !editMarket.market_name.trim()) {
      toast.error("City and market name are required");
      return;
    }
    try {
      await apiCall("PUT", editMarket);
      toast.success("Market updated");
      setEditMarket(null);
      fetchMarkets();
    } catch {
      toast.error("Failed to update market");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this market?")) return;
    try {
      await apiCall("DELETE", { id });
      toast.success("Market deleted");
      fetchMarkets();
    } catch {
      toast.error("Failed to delete market");
    }
  };

  const handleToggleActive = async (market: Market) => {
    try {
      await apiCall("PUT", { ...market, is_active: !market.is_active });
      toast.success(market.is_active ? "Market deactivated" : "Market activated");
      fetchMarkets();
    } catch {
      toast.error("Failed to update market");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_pw");
    sessionStorage.removeItem("admin_un");
    setIsAuthenticated(false);
    setPassword("");
    setUsername("");
  };

  const cities = [...new Set(markets.map((m) => m.city))].sort();
  const filteredMarkets = filterCity === "all" ? markets : markets.filter((m) => m.city === filterCity);

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
              <Input
                id="username"
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="Enter password"
              />
            </div>
            <Button onClick={handleLogin} disabled={loading} className="w-full">
              {loading ? "Verifying..." : "Login"}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Store className="h-5 w-5 text-primary" />
            <h1 className="text-lg font-bold">Wingrow Admin</h1>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{markets.length} markets</Badge>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-1" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-4">
        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <Select value={filterCity} onValueChange={setFilterCity}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by city" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cities</SelectItem>
              {cities.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={() => setShowAddDialog(true)} className="ml-auto">
            <Plus className="h-4 w-4 mr-1" /> Add Market
          </Button>
        </div>

        {/* Markets Grid */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredMarkets.map((market) => (
            <Card key={market.id} className={!market.is_active ? "opacity-60" : ""}>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium">{market.market_name}</p>
                  <p className="text-sm text-muted-foreground">{market.city}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Switch
                    checked={market.is_active}
                    onCheckedChange={() => handleToggleActive(market)}
                    aria-label="Toggle active"
                  />
                  <Button variant="ghost" size="icon" onClick={() => setEditMarket({ ...market })}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(market.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Add Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add New Market</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>City</Label>
              <Select value={newCity} onValueChange={setNewCity}>
                <SelectTrigger><SelectValue placeholder="Select city" /></SelectTrigger>
                <SelectContent>
                  {cities.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                  <SelectItem value="__custom">+ Add New City</SelectItem>
                </SelectContent>
              </Select>
              {newCity === "__custom" && (
                <Input className="mt-2" value={customCity} onChange={(e) => setCustomCity(e.target.value)} placeholder="Enter new city name" />
              )}
            </div>
            <div>
              <Label>Market Name</Label>
              <Input value={newMarketName} onChange={(e) => setNewMarketName(e.target.value)} placeholder="e.g. Kharadi" />
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={newIsActive} onCheckedChange={setNewIsActive} />
              <Label>Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
            <Button onClick={handleAdd}>Add Market</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editMarket} onOpenChange={(o) => !o && setEditMarket(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Market</DialogTitle></DialogHeader>
          {editMarket && (
            <div className="space-y-4">
              <div>
                <Label>City</Label>
                <Input value={editMarket.city} onChange={(e) => setEditMarket({ ...editMarket, city: e.target.value })} />
              </div>
              <div>
                <Label>Market Name</Label>
                <Input value={editMarket.market_name} onChange={(e) => setEditMarket({ ...editMarket, market_name: e.target.value })} />
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={editMarket.is_active} onCheckedChange={(v) => setEditMarket({ ...editMarket, is_active: v })} />
                <Label>Active</Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditMarket(null)}>Cancel</Button>
            <Button onClick={handleUpdate}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPage;
