import { useState, useEffect } from 'react'
import { format, subDays } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { cn } from '@/lib/utils'

interface DateRangeDashboardProps {
  onRangeChange: (start: Date, end: Date) => void
}

export function DateRangeDashboard({ onRangeChange }: DateRangeDashboardProps) {
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(new Date())
  const [shortcut, setShortcut] = useState<string>('today')

  const updateRange = (start: Date, end: Date, type: string) => {
    setStartDate(start)
    setEndDate(end)
    setShortcut(type)
    onRangeChange(start, end)
  }

  useEffect(() => {
    onRangeChange(startDate, endDate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex flex-col md:flex-row flex-wrap items-center gap-4 bg-card border rounded-lg p-4 shadow-sm">
      <ToggleGroup
        type="single"
        value={shortcut}
        onValueChange={(val) => {
          if (!val) return
          const today = new Date()
          if (val === 'today') updateRange(today, today, 'today')
          if (val === '7days') updateRange(subDays(today, 6), today, '7days')
          if (val === '30days') updateRange(subDays(today, 29), today, '30days')
          if (val === '1year') updateRange(subDays(today, 364), today, '1year')
        }}
      >
        <ToggleGroupItem value="today" aria-label="Hoje" className="px-3">
          Hoje
        </ToggleGroupItem>
        <ToggleGroupItem value="7days" aria-label="7 Dias" className="px-3">
          7 Dias
        </ToggleGroupItem>
        <ToggleGroupItem value="30days" aria-label="30 Dias" className="px-3">
          30 Dias
        </ToggleGroupItem>
        <ToggleGroupItem value="1year" aria-label="1 Ano" className="px-3">
          1 Ano
        </ToggleGroupItem>
      </ToggleGroup>

      <div className="flex flex-wrap items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-[140px] justify-start text-left font-normal',
                !startDate && 'text-muted-foreground',
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {startDate ? format(startDate, 'dd/MM/yyyy') : <span>Início</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={(d) => {
                if (d) {
                  setStartDate(d)
                  setShortcut('custom')
                  onRangeChange(d, endDate)
                }
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <span className="text-muted-foreground px-2">até</span>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-[140px] justify-start text-left font-normal',
                !endDate && 'text-muted-foreground',
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {endDate ? format(endDate, 'dd/MM/yyyy') : <span>Fim</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={endDate}
              onSelect={(d) => {
                if (d) {
                  setEndDate(d)
                  setShortcut('custom')
                  onRangeChange(startDate, d)
                }
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
