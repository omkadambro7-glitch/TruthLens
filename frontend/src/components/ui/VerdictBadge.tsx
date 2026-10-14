import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Eye } from 'lucide-react';
import { VerdictType, RiskCategoryType } from '../../types';

interface VerdictBadgeProps {
  verdict: VerdictType | RiskCategoryType | string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const VerdictBadge: React.FC<VerdictBadgeProps> = ({
  verdict,
  size = 'md',
  className = ''
}) => {
  let bgClass = 'bg-[#E6F3F2] text-[#116B67] border-[#BCE3E0]';
  let Icon = CheckCircle2;
  let text = verdict;

  if (verdict === 'LIKELY FAKE' || verdict === 'High-priority human review') {
    bgClass = 'bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]';
    Icon = AlertTriangle;
  } else if (verdict === 'NEEDS HUMAN REVIEW' || verdict === 'Review recommended') {
    bgClass = 'bg-[#FFFBEB] text-[#D97706] border-[#FDE68A]';
    Icon = Eye;
  } else if (verdict === 'Insufficient information') {
    bgClass = 'bg-[#F3F4F6] text-[#4B5563] border-[#E5E7EB]';
    Icon = AlertCircle;
  }

  const sizeClasses = {
    sm: 'px-2.5 py-0.5 text-xs gap-1.5',
    md: 'px-3.5 py-1.5 text-sm gap-2',
    lg: 'px-4 py-2 text-base gap-2.5 font-bold'
  };

  return (
    <span className={`inline-flex items-center rounded-full border font-semibold font-display tracking-wide ${sizeClasses[size]} ${bgClass} ${className}`}>
      <Icon className={size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />
      <span>{text}</span>
    </span>
  );
};

export default VerdictBadge;
