import React from 'react'
import './balance.component.scss'
import { DailyInvestment } from '../../../domain/model/daily-investment.model'
import { calcRentability } from '../../../domain/services/calc-rentability.service'
import { moneyH } from '../../helpers/money.helper'
import { percentageH } from '../../helpers/percentage.helper'

export function BalanceComponent({ data }: { data?: DailyInvestment }) {
  return (
    <div className="balance">
      <div className="balance__item">
        <div className="balance__data">{moneyH(data?.portfolioValue) ?? 'loding...'}</div>
        <div className="label">Balance</div>
      </div>
      <div className="balance__item">
        <div className="balance__data">{percentageH(calcRentability(data)) ?? 'loding...'}</div>
        <div className="label">Profitability</div>
      </div>
    </div>
  )
}
