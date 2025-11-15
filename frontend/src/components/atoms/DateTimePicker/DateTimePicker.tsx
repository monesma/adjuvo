import { DatePicker as AntDatePicker } from 'antd';
import type { DatePickerProps } from 'antd'

export default function DateTimePicker(props: DatePickerProps) {
  return (
    <AntDatePicker {...props} showTime/>
  )
}
