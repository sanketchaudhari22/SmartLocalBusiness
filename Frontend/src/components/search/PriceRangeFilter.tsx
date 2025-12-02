import { useState } from 'react';
import { DollarSign } from 'lucide-react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { Radio } from '../common/Radio';

interface PriceRangeFilterProps {
  minPrice?: number;
  maxPrice?: number;
  onApplyPriceRange: (min?: number, max?: number) => void;
}

export const PriceRangeFilter = ({
  minPrice,
  maxPrice,
  onApplyPriceRange
}: PriceRangeFilterProps) => {
  const [min, setMin] = useState<string>(minPrice?.toString() || '');
  const [max, setMax] = useState<string>(maxPrice?.toString() || '');
  const [selectedRange, setSelectedRange] = useState<string>('');

  const priceRanges = [
    { value: '0-50', label: 'Under $50', min: 0, max: 50 },
    { value: '50-100', label: '$50 - $100', min: 50, max: 100 },
    { value: '100-200', label: '$100 - $200', min: 100, max: 200 },
    { value: '200+', label: '$200+', min: 200, max: undefined }
  ];

  const handleRangeSelect = (rangeValue: string) => {
    setSelectedRange(rangeValue);
    const range = priceRanges.find(r => r.value === rangeValue);
    if (range) {
      setMin(range.min.toString());
      setMax(range.max?.toString() || '');
      onApplyPriceRange(range.min, range.max);
    }
  };

  const handleCustomApply = () => {
    const minValue = min ? parseFloat(min) : undefined;
    const maxValue = max ? parseFloat(max) : undefined;

    if (minValue !== undefined && maxValue !== undefined && minValue > maxValue) {
      alert('Minimum price cannot be greater than maximum price');
      return;
    }

    setSelectedRange('');
    onApplyPriceRange(minValue, maxValue);
  };

  const handleClear = () => {
    setMin('');
    setMax('');
    setSelectedRange('');
    onApplyPriceRange(undefined, undefined);
  };

  const hasActiveFilter = min || max || selectedRange;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
      <h3 className="text-h4 text-neutral-900 mb-4 flex items-center gap-2">
        <DollarSign className="w-5 h-5 text-primary-600" />
        Price Range
      </h3>

      {/* Preset Ranges */}
      <div className="space-y-2 mb-6">
        {priceRanges.map((range) => (
          <Radio
            key={range.value}
            label={range.label}
            value={range.value}
            checked={selectedRange === range.value}
            onChange={() => handleRangeSelect(range.value)}
          />
        ))}
      </div>

      {/* Custom Range */}
      <div className="pt-4 border-t border-neutral-200">
        <p className="text-sm font-medium text-neutral-700 mb-3">
          Custom Range
        </p>
        <div className="grid grid-cols-2 gap-3">
          <Input
            type="number"
            value={min}
            onChange={(e) => {
              setMin(e.target.value);
              setSelectedRange('');
            }}
            placeholder="Min"
            min="0"
            step="10"
            leftIcon={<DollarSign className="w-4 h-4" />}
          />
          <Input
            type="number"
            value={max}
            onChange={(e) => {
              setMax(e.target.value);
              setSelectedRange('');
            }}
            placeholder="Max"
            min="0"
            step="10"
            leftIcon={<DollarSign className="w-4 h-4" />}
          />
        </div>

        <div className="flex gap-2 mt-4">
          <Button
            variant="primary"
            size="sm"
            onClick={handleCustomApply}
            className="flex-1"
          >
            Apply
          </Button>
          {hasActiveFilter && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleClear}
            >
              Clear
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
