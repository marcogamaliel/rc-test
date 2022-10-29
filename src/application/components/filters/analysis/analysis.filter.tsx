import React from 'react'
import './analysis.filter.scss'
import { AnalysisFilter } from '../../../../domain/model/analysis-filter.model'

export function AnalysisFilterComponent(
  { values, setValues }: { values: AnalysisFilter, setValues: (values: AnalysisFilter) => void },
) {
  const { ma4IsActive, ma10IsActive, bollingerIsActive } = values
  return (
    <div className="analysis-filter__wrapper">
      <div className="analysis-filter">
        <div
          className={`on-off ${ma4IsActive ? 'active' : ''}`}
          onClick={() => setValues({ ...values, ma4IsActive: !ma4IsActive })}
        >
          Moving Average 4 Days
        </div>
        <div
          className={`on-off ${ma10IsActive ? 'active' : ''}`}
          onClick={() => setValues({ ...values, ma10IsActive: !ma10IsActive })}
        >
          Moving Average 10 Days
        </div>
        <div
          className={`on-off ${bollingerIsActive ? 'active' : ''}`}
          onClick={() => setValues({ ...values, bollingerIsActive: !bollingerIsActive })}
        >
          Bollinger Bands
        </div>
      </div>
    </div>
  )
}
