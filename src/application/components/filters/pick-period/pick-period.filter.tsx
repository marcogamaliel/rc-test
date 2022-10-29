import React from 'react'
import { Period } from '../../../../domain/model/types/period.type'
import './pick-period.filter.scss'

export function PickPeriodFilter(
  { selected, setSelected }: { selected: string, setSelected: (value: Period) => void },
) {
  const items: { key: Period, label: string }[] = [
    { key: '12M', label: '12M' },
    { key: '1M', label: '1M' },
    { key: '5D', label: '5D' },
  ]

  return (
    <div className="pick-period__wrapper">
      <div className="pick-period">
        {items.map((item) => (
          <div
            className={`pick-period__${item.key} pick-period__element ${selected === item.key ? 'active' : ''}`}
            key={item.key}
            onClick={() => setSelected(item.key)}
          >
            {item.label}
          </div>
        ))}
        <div className="pick-period__indicator"></div>
      </div>
    </div>
  )
}
