import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Brain, Target, TrendingUp, Activity, CheckCircle, XCircle, RotateCcw } from 'lucide-react';

interface ModelMetrics {
  name: string;
  status: 'active' | 'training' | 'offline';
  confidence: number;
  accuracy: number;
  lastUpdate: Date;
  predictions: number;
  successRate: number;
}

const ModelDashboard: React.FC = () => {
  const models: ModelMetrics[] = [
    {
      name: 'Bandit Entry',
      status: 'active',
      confidence: 87.3,
      accuracy: 73.2,
      lastUpdate: new Date(Date.now() - 5 * 60 * 1000),
      predictions: 1247,
      successRate: 68.4
    },
    {
      name: 'Momentum',
      status: 'active',
      confidence: 92.1,
      accuracy: 79.6,
      lastUpdate: new Date(Date.now() - 2 * 60 * 1000),
      predictions: 893,
      successRate: 75.2
    },
    {
      name: 'Whale Trust',
      status: 'active',
      confidence: 78.5,
      accuracy: 65.8,
      lastUpdate: new Date(Date.now() - 8 * 60 * 1000),
      predictions: 562,
      successRate: 61.3
    },
    {
      name: 'RL Exit',
      status: 'training',
      confidence: 0,
      accuracy: 82.1,
      lastUpdate: new Date(Date.now() - 30 * 60 * 1000),
      predictions: 0,
      successRate: 0
    },
    {
      name: 'Social Signal',
      status: 'offline',
      confidence: 0,
      accuracy: 0,
      lastUpdate: new Date(Date.now() - 2 * 60 * 60 * 1000),
      predictions: 0,
      successRate: 0
    }
  ];

  const ensembleMetrics = {
    activeModels: models.filter(m => m.status === 'active').length,
    avgConfidence: models.filter(m => m.status === 'active').reduce((acc, m) => acc + m.confidence, 0) / models.filter(m => m.status === 'active').length,
    totalPredictions: models.reduce((acc, m) => acc + m.predictions, 0),
    ensembleAccuracy: 81.7
  };

  const formatTimeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-sniper-success" />;
      case 'training': return <RotateCcw className="h-4 w-4 text-sniper-warning animate-spin" />;
      case 'offline': return <XCircle className="h-4 w-4 text-sniper-danger" />;
      default: return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <Badge variant="default" className="text-xs">Active</Badge>;
      case 'training': return <Badge variant="secondary" className="text-xs">Training</Badge>;
      case 'offline': return <Badge variant="destructive" className="text-xs">Offline</Badge>;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Ensemble Overview */}
      <Card className="sniper-glow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Ensemble Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-sniper-success">{ensembleMetrics.activeModels}</p>
              <p className="text-sm text-muted-foreground">Active Models</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{ensembleMetrics.avgConfidence.toFixed(1)}%</p>
              <p className="text-sm text-muted-foreground">Avg Confidence</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{ensembleMetrics.totalPredictions.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Total Predictions</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-sniper-info">{ensembleMetrics.ensembleAccuracy}%</p>
              <p className="text-sm text-muted-foreground">Ensemble Accuracy</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Individual Models */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {models.map((model, index) => (
          <Card key={index} className={model.status === 'active' ? 'border-sniper-success/30' : ''}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  {getStatusIcon(model.status)}
                  {model.name}
                </CardTitle>
                {getStatusBadge(model.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {model.status === 'active' && (
                <>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Confidence</span>
                      <span className="font-medium">{model.confidence.toFixed(1)}%</span>
                    </div>
                    <Progress value={model.confidence} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Accuracy</span>
                      <span className="font-medium">{model.accuracy.toFixed(1)}%</span>
                    </div>
                    <Progress value={model.accuracy} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Predictions</p>
                      <p className="font-medium">{model.predictions.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Success Rate</p>
                      <p className="font-medium text-sniper-success">{model.successRate.toFixed(1)}%</p>
                    </div>
                  </div>
                </>
              )}

              {model.status === 'training' && (
                <div className="text-center py-4">
                  <RotateCcw className="h-8 w-8 text-sniper-warning animate-spin mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Model retraining in progress</p>
                </div>
              )}

              {model.status === 'offline' && (
                <div className="text-center py-4">
                  <XCircle className="h-8 w-8 text-sniper-danger mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Model offline</p>
                </div>
              )}

              <div className="text-xs text-muted-foreground">
                Last update: {formatTimeAgo(model.lastUpdate)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Model Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Model Performance Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-card border rounded-lg">
                <Activity className="h-8 w-8 text-sniper-info mx-auto mb-2" />
                <p className="text-lg font-bold">+12.3%</p>
                <p className="text-sm text-muted-foreground">7-day Uplift</p>
              </div>
              <div className="text-center p-4 bg-card border rounded-lg">
                <Target className="h-8 w-8 text-sniper-success mx-auto mb-2" />
                <p className="text-lg font-bold">0.847</p>
                <p className="text-sm text-muted-foreground">Sharpe Ratio</p>
              </div>
              <div className="text-center p-4 bg-card border rounded-lg">
                <Brain className="h-8 w-8 text-accent mx-auto mb-2" />
                <p className="text-lg font-bold">2.3s</p>
                <p className="text-sm text-muted-foreground">Avg Decision Time</p>
              </div>
            </div>

            <div className="h-32 bg-card/50 border rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Performance chart visualization would go here</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModelDashboard;