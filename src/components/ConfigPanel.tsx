import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Settings, Shield, Zap, Brain } from 'lucide-react';

interface ConfigPanelProps {
  config: any;
  onConfigChange: (config: any) => void;
}

const ConfigPanel: React.FC<ConfigPanelProps> = ({ config, onConfigChange }) => {
  const updateConfig = (section: string, key: string, value: any) => {
    onConfigChange({
      ...config,
      [section]: {
        ...config[section],
        [key]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Trading Mode */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Trading Mode
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Mode</span>
            <Select 
              value={config.mode} 
              onValueChange={(value) => onConfigChange({...config, mode: value})}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PAPER">Paper</SelectItem>
                <SelectItem value="REAL">Real</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <span>Auto-Snipe</span>
            <Switch 
              checked={config.autoSnipe} 
              onCheckedChange={(checked) => onConfigChange({...config, autoSnipe: checked})}
            />
          </div>
        </CardContent>
      </Card>

      {/* Risk Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Risk Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Max Daily DD</span>
              <span className="text-sm font-medium">{(config.risk?.maxDailyDd * 100 || 2).toFixed(1)}%</span>
            </div>
            <Slider
              value={[config.risk?.maxDailyDd * 100 || 2]}
              onValueChange={([value]) => updateConfig('risk', 'maxDailyDd', value / 100)}
              max={10}
              min={0.5}
              step={0.1}
              className="w-full"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Max Trade Loss</span>
              <span className="text-sm font-medium">{(config.risk?.maxTradeLoss * 100 || 0.5).toFixed(1)}%</span>
            </div>
            <Slider
              value={[config.risk?.maxTradeLoss * 100 || 0.5]}
              onValueChange={([value]) => updateConfig('risk', 'maxTradeLoss', value / 100)}
              max={2}
              min={0.1}
              step={0.1}
              className="w-full"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Max Exposure</span>
              <span className="text-sm font-medium">{(config.risk?.maxExposure * 100 || 5).toFixed(1)}%</span>
            </div>
            <Slider
              value={[config.risk?.maxExposure * 100 || 5]}
              onValueChange={([value]) => updateConfig('risk', 'maxExposure', value / 100)}
              max={20}
              min={1}
              step={0.5}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm">Max Concurrent Positions</label>
            <Input
              type="number"
              value={config.risk?.maxConcurrentPositions || 2}
              onChange={(e) => updateConfig('risk', 'maxConcurrentPositions', Number(e.target.value))}
              min={1}
              max={10}
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Min Confidence</span>
              <span className="text-sm font-medium">{(config.risk?.minConfidence * 100 || 85).toFixed(0)}%</span>
            </div>
            <Slider
              value={[config.risk?.minConfidence * 100 || 85]}
              onValueChange={([value]) => updateConfig('risk', 'minConfidence', value / 100)}
              max={99}
              min={50}
              step={1}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      {/* Safety Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Safety Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm">Min Liquidity (USD)</label>
            <Input
              type="number"
              value={config.filters?.minLpUsd || 20000}
              onChange={(e) => updateConfig('filters', 'minLpUsd', Number(e.target.value))}
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Min LP Lock %</span>
              <span className="text-sm font-medium">{config.filters?.minLpLockPct || 75}%</span>
            </div>
            <Slider
              value={[config.filters?.minLpLockPct || 75]}
              onValueChange={([value]) => updateConfig('filters', 'minLpLockPct', value)}
              max={100}
              min={0}
              step={5}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm">Max Fee/Tax (bps)</label>
            <Input
              type="number"
              value={config.filters?.maxFeeTaxBps || 800}
              onChange={(e) => updateConfig('filters', 'maxFeeTaxBps', Number(e.target.value))}
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Top10 Holder Max %</span>
              <span className="text-sm font-medium">{config.filters?.top10HolderMaxPct || 50}%</span>
            </div>
            <Slider
              value={[config.filters?.top10HolderMaxPct || 50]}
              onValueChange={([value]) => updateConfig('filters', 'top10HolderMaxPct', value)}
              max={90}
              min={10}
              step={5}
              className="w-full"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Forbid Blacklisted</span>
            <Switch 
              checked={config.filters?.forbidBlacklist !== false} 
              onCheckedChange={(checked) => updateConfig('filters', 'forbidBlacklist', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Require Owner Renounce</span>
            <Switch 
              checked={config.filters?.requireOwnerRenounce !== false} 
              onCheckedChange={(checked) => updateConfig('filters', 'requireOwnerRenounce', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Execution Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Execution Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">Probe Enabled</span>
            <Switch 
              checked={config.execution?.probeEnabled !== false} 
              onCheckedChange={(checked) => updateConfig('execution', 'probeEnabled', checked)}
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Probe Size %</span>
              <span className="text-sm font-medium">{(config.execution?.probePct * 100 || 0.1).toFixed(2)}%</span>
            </div>
            <Slider
              value={[config.execution?.probePct * 100 || 0.1]}
              onValueChange={([value]) => updateConfig('execution', 'probePct', value / 100)}
              max={1}
              min={0.01}
              step={0.01}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm">Clips</label>
            <Input
              type="number"
              value={config.execution?.clips || 3}
              onChange={(e) => updateConfig('execution', 'clips', Number(e.target.value))}
              min={1}
              max={10}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm">Clip Interval (sec)</label>
            <Input
              type="number"
              value={config.execution?.clipIntervalSec || 3}
              onChange={(e) => updateConfig('execution', 'clipIntervalSec', Number(e.target.value))}
              min={1}
              max={30}
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Max Impact %</span>
              <span className="text-sm font-medium">{config.execution?.impactMaxPct || 1}%</span>
            </div>
            <Slider
              value={[config.execution?.impactMaxPct || 1]}
              onValueChange={([value]) => updateConfig('execution', 'impactMaxPct', value)}
              max={5}
              min={0.1}
              step={0.1}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm">Slippage (bps)</label>
            <Input
              type="number"
              value={config.execution?.slippageBps || 80}
              onChange={(e) => updateConfig('execution', 'slippageBps', Number(e.target.value))}
            />
          </div>
        </CardContent>
      </Card>

      {/* Model Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Models
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm">Ensemble Required</label>
            <Input
              type="number"
              value={config.models?.ensembleRequired || 2}
              onChange={(e) => updateConfig('models', 'ensembleRequired', Number(e.target.value))}
              min={1}
              max={5}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm">Bandit Half-Life (days)</label>
            <Input
              type="number"
              value={config.models?.banditHalfLifeDays || 7}
              onChange={(e) => updateConfig('models', 'banditHalfLifeDays', Number(e.target.value))}
              min={1}
              max={30}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm">RL Retrain Interval (days)</label>
            <Input
              type="number"
              value={config.models?.rlRetrainDays || 1}
              onChange={(e) => updateConfig('models', 'rlRetrainDays', Number(e.target.value))}
              min={1}
              max={7}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfigPanel;