import React from 'react'
import { AnalysisFilter } from '../../../../domain/model/analysis-filter.model'
import './analysis.filter.scss'

export function AnalysisFilterComponent(
  { values, setValues }: { values: AnalysisFilter, setValues: (values: AnalysisFilter) => void }
) {
  const { ma4IsActive, ma10IsActive } = values
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
      </div>
    </div>
  )
}