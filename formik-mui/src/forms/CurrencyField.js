import React from 'react';
import TextField from '../forms/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import currencify from '../utils/currencify';

class CurrencyField extends React.PureComponent {
	render() {
		const {InputProps, InputAdornmentProps, currencifyOptions, currencyfiFunc = currencify, ...props} = this.props;

  	return (
			<TextField
				{...props}
				helperText={currencyfiFunc(props.value || (props.field || {}).value, currencifyOptions) || ''}
				InputProps={{
					startAdornment: <InputAdornment position='start' {...InputAdornmentProps}>₹</InputAdornment>,
					...InputProps,
				}}
			/>
  	);
	}
}

export default CurrencyField;
