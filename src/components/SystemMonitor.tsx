import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Activity, 
  Database, 
  Cpu, 
  BarChart3, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Wifi,
  Clock,
  Shield,
  Zap
} from 'lucide-react';

interface SystemStatus {
  component: string;
  status: 'healthy' | 'warning' | 'error';
  latency?: number;
  lastCheck: Date;
  details?: string;
}

interface CircuitBreaker {
  name: string;
  status: 'closed' | 'open' | 'half-open';
  failures: number;
  threshold: number;
  resetTime?: Date;
}

const SystemMonitor: React.FC = () => {
  const [systemHealth] = useState<SystemStatus[]>([
    {
      component: 'RPC Connection',
      status: 'healthy',
      latency: 45,
      lastCheck: new Date(Date.now() - 1000),
      details: 'Solana RPC healthy'
    },
    {
      component: 'Jito Bundles',
      status: 'healthy',
      latency: 78,
      lastCheck: new Date(Date.now() - 2000),
      details: 'Bundle success rate: 92%'
    },
    {
      component: 'Jupiter API',
      status: 'warning',
      latency: 234,
      lastCheck: new Date(Date.now() - 5000),
      details: 'High latency detected'
    },
    {
      component: 'Database',
      status: 'healthy',
      latency: 12,
      lastCheck: new Date(Date.now() - 500),
      details: 'PostgreSQL responsive'
    },
    {
      component: 'Model Inference',
      status: 'healthy',
      latency: 156,
      lastCheck: new Date(Date.now() - 3000),
      details: 'All models responding'
    },
    {
      component: 'Safety Filters',
      status: 'error',
      latency: 0,
      lastCheck: new Date(Date.now() - 30000),
      details: 'Honeypot check timeout'
    }
  ]);

  const [circuitBreakers] = useState<CircuitBreaker[]>([
    {
      name: 'Trade Execution',
      status: 'closed',
      failures: 2,
      threshold: 5
    },
    {
      name: 'Model Inference',
      status: 'closed',
      failures: 0,
      threshold: 3
    },
    {
      name: 'Price Feed',
      status: 'half-open',
      failures: 3,
      threshold: 3,
      resetTime: new Date(Date.now() + 5 * 60 * 1000)
    },
    {
      name: 'Safety Checks',
      status: 'open',
      failures: 8,
      threshold: 5,
      resetTime: new Date(Date.now() + 10 * 60 * 1000)
    }
  ]);

  const [metrics] = useState({
    cpuUsage: 34,
    memoryUsage: 67,
    diskUsage: 23,
    networkLatency: 89,
    activeConnections: 156,
    queueDepth: 23,
    errorRate: 0.8,
    throughput: 1247
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="h-4 w-4 text-sniper-success" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-sniper-warning" />;
      case 'error': return <XCircle className="h-4 w-4 text-sniper-danger" />;
      default: return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'healthy': return <Badge variant="default" className="text-xs bg-sniper-success">Healthy</Badge>;
      case 'warning': return <Badge variant="secondary" className="text-xs bg-sniper-warning">Warning</Badge>;
      case 'error': return <Badge variant="destructive" className="text-xs">Error</Badge>;
      default: return null;
    }
  };

  const getCircuitBreakerIcon = (status: string) => {
    switch (status) {
      case 'closed': return <CheckCircle className="h-4 w-4 text-sniper-success" />;
      case 'half-open': return <AlertTriangle className="h-4 w-4 text-sniper-warning" />;
      case 'open': return <XCircle className="h-4 w-4 text-sniper-danger" />;
      default: return null;
    }
  };

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    return `${Math.floor(minutes / 60)}h ago`;
  };

  return (
    <div className="space-y-6">
      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">CPU Usage</p>
                <p className="text-2xl font-bold">{metrics.cpuUsage}%</p>
              </div>
              <Cpu className="h-8 w-8 text-sniper-info" />
            </div>
            <Progress value={metrics.cpuUsage} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Memory</p>
                <p className="text-2xl font-bold">{metrics.memoryUsage}%</p>
              </div>
              <Database className="h-8 w-8 text-sniper-warning" />
            </div>
            <Progress value={metrics.memoryUsage} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Throughput</p>
                <p className="text-2xl font-bold">{metrics.throughput}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-sniper-success" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">req/min</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Error Rate</p>
                <p className="text-2xl font-bold">{metrics.errorRate}%</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-sniper-success" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Very low</p>
          </CardContent>
        </Card>
      </div>

      {/* Component Health */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Component Health
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {systemHealth.map((component, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-card border rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(component.status)}
                  <div>
                    <p className="font-medium">{component.component}</p>
                    <p className="text-sm text-muted-foreground">{component.details}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {component.latency && (
                    <div className="text-right">
                      <p className="text-sm font-medium">{component.latency}ms</p>
                      <p className="text-xs text-muted-foreground">latency</p>
                    </div>
                  )}
                  <div className="text-right">
                    {getStatusBadge(component.status)}
                    <p className="text-xs text-muted-foreground mt-1">{formatTimeAgo(component.lastCheck)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Circuit Breakers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Circuit Breakers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {circuitBreakers.map((breaker, index) => (
              <div key={index} className="p-4 bg-card border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getCircuitBreakerIcon(breaker.status)}
                    <p className="font-medium">{breaker.name}</p>
                  </div>
                  <Badge 
                    variant={breaker.status === 'closed' ? 'default' : breaker.status === 'half-open' ? 'secondary' : 'destructive'}
                    className="text-xs"
                  >
                    {breaker.status.toUpperCase()}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Failures</span>
                    <span className="font-medium">{breaker.failures}/{breaker.threshold}</span>
                  </div>
                  <Progress 
                    value={(breaker.failures / breaker.threshold) * 100} 
                    className="h-2"
                  />
                  
                  {breaker.resetTime && (
                    <p className="text-xs text-muted-foreground">
                      Reset in {Math.ceil((breaker.resetTime.getTime() - Date.now()) / 60000)}m
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Active Alerts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Safety filter timeout detected. Honeypot checks failing for 30+ seconds.
            </AlertDescription>
          </Alert>
          
          <Alert>
            <Clock className="h-4 w-4" />
            <AlertDescription>
              Jupiter API latency above threshold (234ms &gt; 200ms). Consider fallback routing.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Emergency Controls
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="destructive" size="sm">
              Emergency Stop
            </Button>
            <Button variant="outline" size="sm">
              Reset Circuits
            </Button>
            <Button variant="outline" size="sm">
              Flush Queues
            </Button>
            <Button variant="outline" size="sm">
              Force Sync
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemMonitor;