import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Target, 
  Zap, 
  TrendingUp, 
  Shield, 
  AlertTriangle, 
  DollarSign,
  Timer,
  Activity,
  Settings,
  Crosshair
} from 'lucide-react';
import sniperLogo from '@/assets/sniper-logo.png';

interface Token {
  id: string;
  name: string;
  symbol: string;
  address: string;
  price: number;
  marketCap: number;
  volume24h: number;
  change24h: number;
  liquidity: number;
  holders: number;
  safetyScore: number;
  launchTime: Date;
  rugPullRisk: 'LOW' | 'MEDIUM' | 'HIGH';
}

interface Position {
  tokenAddress: string;
  tokenName: string;
  tokenSymbol: string;
  amount: number;
  entryPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercent: number;
}

const SniperDashboard = () => {
  const [isSnipingActive, setIsSnipingActive] = useState(false);
  const [autoSnipeEnabled, setAutoSnipeEnabled] = useState(false);
  const [minLiquidity, setMinLiquidity] = useState(10000);
  const [maxBuyAmount, setMaxBuyAmount] = useState(1);
  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);

  const [newTokens] = useState<Token[]>([
    {
      id: '1',
      name: 'PepeCoin 2.0',
      symbol: 'PEPE2',
      address: '0x1234...5678',
      price: 0.000001,
      marketCap: 50000,
      volume24h: 25000,
      change24h: 234.5,
      liquidity: 15000,
      holders: 156,
      safetyScore: 75,
      launchTime: new Date(Date.now() - 5 * 60 * 1000),
      rugPullRisk: 'LOW'
    },
    {
      id: '2',
      name: 'ShibaInu Max',
      symbol: 'SHIBAMAX',
      address: '0xabcd...efgh',
      price: 0.00000034,
      marketCap: 125000,
      volume24h: 67000,
      change24h: 567.8,
      liquidity: 45000,
      holders: 432,
      safetyScore: 85,
      launchTime: new Date(Date.now() - 12 * 60 * 1000),
      rugPullRisk: 'LOW'
    },
    {
      id: '3',
      name: 'DogeKiller',
      symbol: 'DOGEK',
      address: '0x9876...1234',
      price: 0.000005,
      marketCap: 8000,
      volume24h: 3500,
      change24h: 89.2,
      liquidity: 2500,
      holders: 67,
      safetyScore: 45,
      launchTime: new Date(Date.now() - 2 * 60 * 1000),
      rugPullRisk: 'HIGH'
    }
  ]);

  const [positions] = useState<Position[]>([
    {
      tokenAddress: '0x1111...2222',
      tokenName: 'MoonCoin',
      tokenSymbol: 'MOON',
      amount: 1000000,
      entryPrice: 0.000002,
      currentPrice: 0.000008,
      pnl: 6,
      pnlPercent: 300
    },
    {
      tokenAddress: '0x3333...4444',
      tokenName: 'RocketDoge',
      tokenSymbol: 'RDOGE',
      amount: 500000,
      entryPrice: 0.000012,
      currentPrice: 0.000008,
      pnl: -2,
      pnlPercent: -33.3
    }
  ]);

  const [stats] = useState({
    totalProfit: 2456.78,
    successRate: 73.2,
    totalTrades: 127,
    activeSnipers: 3
  });

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toFixed(2);
  };

  const handleSnipeToken = (tokenId: string) => {
    setSelectedTokens(prev => 
      prev.includes(tokenId) 
        ? prev.filter(id => id !== tokenId)
        : [...prev, tokenId]
    );
  };

  const executeSnipe = () => {
    if (selectedTokens.length > 0) {
      setIsSnipingActive(true);
      setTimeout(() => setIsSnipingActive(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-background data-grid p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <img src={sniperLogo} alt="Sniper AI" className="w-10 h-10" />
          <div>
            <h1 className="text-2xl font-bold text-sniper-success">SNIPER AI</h1>
            <p className="text-sm text-muted-foreground">Memecoin Hunter Protocol</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isSnipingActive ? 'bg-sniper-success pulse-green' : 'bg-muted'}`} />
            <span className="text-sm">{isSnipingActive ? 'SNIPING ACTIVE' : 'STANDBY'}</span>
          </div>
          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="sniper-glow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Profit</p>
                <p className="text-2xl font-bold text-sniper-success">${stats.totalProfit}</p>
              </div>
              <DollarSign className="h-8 w-8 text-sniper-success" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold">{stats.successRate}%</p>
              </div>
              <Target className="h-8 w-8 text-sniper-info" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Trades</p>
                <p className="text-2xl font-bold">{stats.totalTrades}</p>
              </div>
              <Activity className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Snipers</p>
                <p className="text-2xl font-bold">{stats.activeSnipers}</p>
              </div>
              <Crosshair className="h-8 w-8 text-sniper-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Sniper Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Sniper Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Auto-Snipe</span>
              <Button
                variant={autoSnipeEnabled ? "snipe" : "outline"}
                size="sm"
                onClick={() => setAutoSnipeEnabled(!autoSnipeEnabled)}
              >
                {autoSnipeEnabled ? "ON" : "OFF"}
              </Button>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm">Min Liquidity (ETH)</label>
              <Input
                type="number"
                value={minLiquidity}
                onChange={(e) => setMinLiquidity(Number(e.target.value))}
                placeholder="10000"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm">Max Buy Amount (ETH)</label>
              <Input
                type="number"
                value={maxBuyAmount}
                onChange={(e) => setMaxBuyAmount(Number(e.target.value))}
                placeholder="1"
              />
            </div>

            <Button 
              variant="snipe" 
              className="w-full"
              onClick={executeSnipe}
              disabled={selectedTokens.length === 0 || isSnipingActive}
            >
              <Zap className="h-4 w-4 mr-2" />
              {isSnipingActive ? 'SNIPING...' : `SNIPE SELECTED (${selectedTokens.length})`}
            </Button>
          </CardContent>
        </Card>

        {/* Current Positions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Current Positions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {positions.map((position, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-card border rounded-lg">
                  <div>
                    <p className="font-medium">{position.tokenSymbol}</p>
                    <p className="text-sm text-muted-foreground">{formatNumber(position.amount)} tokens</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${position.pnl >= 0 ? 'text-sniper-success' : 'text-sniper-danger'}`}>
                      ${position.pnl.toFixed(2)}
                    </p>
                    <p className={`text-sm ${position.pnlPercent >= 0 ? 'text-sniper-success' : 'text-sniper-danger'}`}>
                      {position.pnlPercent >= 0 ? '+' : ''}{position.pnlPercent.toFixed(1)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New Tokens Detection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            New Token Detection
            <Badge variant="outline" className="ml-auto">
              {newTokens.length} detected
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {newTokens.map((token) => (
              <div 
                key={token.id} 
                className={`p-4 border rounded-lg transition-all cursor-pointer ${
                  selectedTokens.includes(token.id) ? 'border-sniper-success bg-sniper-success/10' : 'border-border hover:border-accent'
                }`}
                onClick={() => handleSnipeToken(token.id)}
              >
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                  <div>
                    <p className="font-medium">{token.name}</p>
                    <p className="text-sm text-muted-foreground">{token.symbol}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Timer className="h-3 w-3" />
                      <span className="text-xs">{Math.floor((Date.now() - token.launchTime.getTime()) / 60000)}m ago</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Price</p>
                    <p className="font-medium">${token.price.toFixed(8)}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Market Cap</p>
                    <p className="font-medium">${formatNumber(token.marketCap)}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Liquidity</p>
                    <p className="font-medium">${formatNumber(token.liquidity)}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">24h Change</p>
                    <p className="font-medium text-sniper-success">+{token.change24h.toFixed(1)}%</p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Badge 
                      variant={token.rugPullRisk === 'LOW' ? 'default' : token.rugPullRisk === 'MEDIUM' ? 'secondary' : 'destructive'}
                      className="w-fit"
                    >
                      <Shield className="h-3 w-3 mr-1" />
                      {token.rugPullRisk} RISK
                    </Badge>
                    <div className="flex items-center gap-1">
                      <span className="text-xs">Safety: {token.safetyScore}/100</span>
                    </div>
                  </div>
                </div>

                {token.rugPullRisk === 'HIGH' && (
                  <Alert className="mt-3">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                      High rug pull risk detected. Low liquidity and recent launch.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SniperDashboard;