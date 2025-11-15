import { AutoComplete as AntAutoComplete } from 'antd';
import type { AutoCompleteProps } from 'antd'

export default function AutoCompleteInput(props: AutoCompleteProps) {
  return (
    <AntAutoComplete {...props}/>
  )
}
