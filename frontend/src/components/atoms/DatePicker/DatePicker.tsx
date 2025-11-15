import { DatePicker as AntDatePicker } from 'antd';
import type { DatePickerProps } from 'antd'

export default function DatePicker(props: DatePickerProps) {
  return (
    <AntDatePicker {...props} />
  )
}
