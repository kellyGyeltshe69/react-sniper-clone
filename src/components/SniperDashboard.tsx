import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
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
  Crosshair,
  Brain,
  Database,
  Cpu,
  BarChart3,
  AlertCircle,
  CheckCircle,
  XCircle,
  PlayCircle,
  PauseCircle,
  RotateCcw
} from 'lucide-react';
import sniperLogo from '@/assets/sniper-logo.png';
import ConfigPanel from './ConfigPanel';
import ModelDashboard from './ModelDashboard';
import SystemMonitor from './SystemMonitor';

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
  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  
  const [config, setConfig] = useState({
    mode: 'PAPER',
    autoSnipe: false,
    risk: {
      maxDailyDd: 0.02,
      maxTradeLoss: 0.005,
      maxExposure: 0.05,
      maxConcurrentPositions: 2,
      kellyScale: 0.10,
      minConfidence: 0.85
    },
    filters: {
      minLpUsd: 20000,
      minLpLockPct: 75,
      forbidBlacklist: true,
      maxFeeTaxBps: 800,
      requireOwnerRenounce: true,
      top10HolderMaxPct: 50,
      poolAgeMinSec: 30
    },
    execution: {
      probeEnabled: true,
      probePct: 0.001,
      clips: 3,
      clipIntervalSec: 3,
      impactMaxPct: 1.0,
      slippageBps: 80
    },
    models: {
      ensembleRequired: 2,
      banditHalfLifeDays: 7,
      rlRetrainDays: 1
    }
  });

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
            <p className="text-sm text-muted-foreground">Memecoin Hunter Protocol v2.0</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant={config.mode === 'PAPER' ? 'secondary' : 'default'} className="text-xs">
            {config.mode} MODE
          </Badge>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isSnipingActive ? 'bg-sniper-success pulse-green' : 'bg-muted'}`} />
            <span className="text-sm">{isSnipingActive ? 'SNIPING ACTIVE' : 'STANDBY'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={isSnipingActive ? "destructive" : "snipe"}
              size="sm"
              onClick={() => setIsSnipingActive(!isSnipingActive)}
            >
              {isSnipingActive ? (
                <>
                  <PauseCircle className="h-4 w-4 mr-2" />
                  STOP
                </>
              ) : (
                <>
                  <PlayCircle className="h-4 w-4 mr-2" />
                  START
                </>
              )}
            </Button>
          </div>
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
                <p className="text-xs text-muted-foreground">24h: +$234.56</p>
              </div>
              <DollarSign className="h-8 w-8 text-sniper-success" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">AI Confidence</p>
                <p className="text-2xl font-bold text-sniper-info">87.3%</p>
                <p className="text-xs text-muted-foreground">Ensemble avg</p>
              </div>
              <Brain className="h-8 w-8 text-sniper-info" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold">{stats.successRate}%</p>
                <p className="text-xs text-muted-foreground">Last 100 trades</p>
              </div>
              <Target className="h-8 w-8 text-sniper-success" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Positions</p>
                <p className="text-2xl font-bold">{positions.length}</p>
                <p className="text-xs text-muted-foreground">Max: {config.risk.maxConcurrentPositions}</p>
              </div>
              <Crosshair className="h-8 w-8 text-sniper-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="config">Configuration</TabsTrigger>
          <TabsTrigger value="models">AI Models</TabsTrigger>
          <TabsTrigger value="monitor">System Monitor</TabsTrigger>
          <TabsTrigger value="positions">Positions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Quick Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Quick Controls
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Auto-Snipe</span>
                  <Switch 
                    checked={config.autoSnipe} 
                    onCheckedChange={(checked) => setConfig({...config, autoSnipe: checked})}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm">Max Exposure: {(config.risk.maxExposure * 100).toFixed(1)}%</label>
                  <Slider
                    value={[config.risk.maxExposure * 100]}
                    onValueChange={([value]) => setConfig({
                      ...config, 
                      risk: {...config.risk, maxExposure: value / 100}
                    })}
                    max={20}
                    min={1}
                    step={0.5}
                    className="w-full"
                  />
                </div>

                <Button 
                  variant="snipe" 
                  className="w-full"
                  onClick={executeSnipe}
                  disabled={selectedTokens.length === 0 || !isSnipingActive}
                >
                  <Target className="h-4 w-4 mr-2" />
                  SNIPE SELECTED ({selectedTokens.length})
                </Button>
              </CardContent>
            </Card>

            {/* Current Positions */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Active Positions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {positions.map((position, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-card border rounded-lg">
                      <div>
                        <p className="font-medium">{position.tokenSymbol}</p>
                        <p className="text-sm text-muted-foreground">{formatNumber(position.amount)} tokens</p>
                        <p className="text-xs text-muted-foreground">Entry: ${position.entryPrice.toFixed(8)}</p>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${position.pnl >= 0 ? 'text-sniper-success' : 'text-sniper-danger'}`}>
                          ${position.pnl.toFixed(2)}
                        </p>
                        <p className={`text-sm ${position.pnlPercent >= 0 ? 'text-sniper-success' : 'text-sniper-danger'}`}>
                          {position.pnlPercent >= 0 ? '+' : ''}{position.pnlPercent.toFixed(1)}%
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Current: ${position.currentPrice.toFixed(8)}
                        </p>
                      </div>
                    </div>
                  ))}
                  {positions.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      No active positions
                    </div>
                  )}
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
                    <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center">
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

                      <div>
                        <p className="text-sm text-muted-foreground">AI Score</p>
                        <div className="flex items-center gap-2">
                          <Progress value={token.safetyScore} className="h-2 w-16" />
                          <span className="text-sm font-medium">{token.safetyScore}</span>
                        </div>
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
                          <Brain className="h-3 w-3" />
                          <span className="text-xs">EV: +12.3%</span>
                        </div>
                      </div>
                    </div>

                    {token.rugPullRisk === 'HIGH' && (
                      <Alert className="mt-3">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription className="text-sm">
                          High rug pull risk detected. AI models flagged low liquidity and suspicious contract patterns.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="config">
          <ConfigPanel config={config} onConfigChange={setConfig} />
        </TabsContent>

        <TabsContent value="models">
          <ModelDashboard />
        </TabsContent>

        <TabsContent value="monitor">
          <SystemMonitor />
        </TabsContent>

        <TabsContent value="positions">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Position Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {positions.map((position, index) => (
                  <div key={index} className="p-4 bg-card border rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <p className="font-medium text-lg">{position.tokenSymbol}</p>
                        <p className="text-sm text-muted-foreground">{position.tokenName}</p>
                        <p className="text-xs text-muted-foreground">{position.tokenAddress}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground">Position Size</p>
                        <p className="font-medium">{formatNumber(position.amount)} tokens</p>
                        <p className="text-sm">Entry: ${position.entryPrice.toFixed(8)}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground">Current Value</p>
                        <p className="font-medium">${position.currentPrice.toFixed(8)}</p>
                        <p className="text-sm text-muted-foreground">
                          ${(position.amount * position.currentPrice).toFixed(2)} total
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground">P&L</p>
                        <p className={`text-lg font-bold ${position.pnl >= 0 ? 'text-sniper-success' : 'text-sniper-danger'}`}>
                          ${position.pnl.toFixed(2)}
                        </p>
                        <p className={`text-sm ${position.pnlPercent >= 0 ? 'text-sniper-success' : 'text-sniper-danger'}`}>
                          {position.pnlPercent >= 0 ? '+' : ''}{position.pnlPercent.toFixed(1)}%
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm">
                        Take Profit 25%
                      </Button>
                      <Button variant="outline" size="sm">
                        Take Profit 50%
                      </Button>
                      <Button variant="destructive" size="sm">
                        Close Position
                      </Button>
                    </div>
                  </div>
                ))}
                
                {positions.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No active positions</p>
                    <p className="text-sm">Start sniping to see positions here</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SniperDashboard;