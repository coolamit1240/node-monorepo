import React from 'react';
import cx from 'classnames';

import Radio from '@material-ui/core/Radio';
import MuiRadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import formikToMuiProps from '../forms/formikToMuiProps';
import {withStyles} from '@material-ui/core/styles';

const styles = () => ({
	formControl: {
		'flex-direction': 'row',
	},
	formLabel: {
		display: 'flex',
		'flex-direction': 'row',
		'align-items': 'center',
		'margin-right': '20px',
	},
});

class RadioGroup extends React.Component {
  state = {
  	dirty: false,
	}
	constructor(p) {
		super(p);
		this.handleChange = this.handleChange.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
	}
  handleChange = event => {
  	if (this.props.field) this.props.field.onChange(event);
  	if (this.props.onChange) this.props.onChange(event.target.value);
  	if (!this.state.dirty) this.setState({dirty: true});
	}
	handleBlur() {
		// take care of touched
		if (this.props.field) this.props.form.setFieldTouched(this.props.field.name, true);
	}
  render() {
  	let {
  		label,
  		FormControlProps,
  		FormLabelProps,
  		FormHelperTextProps,
  		FormControlLabelProps,
  		RadioProps,
  		RadioGroupProps,
  		compact,
  		classes,
  		options,
  		...props
  	} = this.props;

  	const {error, helperText, ...fp} = formikToMuiProps(props);

  	return (
  		<FormControl
  			error={error}
  			{...FormControlProps}
  			classes={{...(FormControlProps || {}).classes, ...(compact ? {root: classes.formControl} : {})}}
  		>
  			{label && (
  				<FormLabel
  					{...FormLabelProps}
  					classes={{...(FormLabelProps || {}).classes, ...(compact ? {root: classes.formLabel} : {})}}
  				>
  					{label}
  				</FormLabel>
  			)}
  			<MuiRadioGroup
  				{...RadioGroupProps}
  				row={(RadioGroupProps || {}).row || compact}
  				{...fp}
  				onChange={this.handleChange}
  				onBlur={this.handleBlur}
  			>
  				{options.map(option => (
  					<FormControlLabel
  						key={option.value}
  						control={<Radio {...RadioProps}/>}
  						{...FormControlLabelProps}
  						value={option.value}
  						label={option.label}
  					/>
  				))}
  			</MuiRadioGroup>
  			{helperText && (
  				<FormHelperText
  					{...FormHelperTextProps}
  					className={cx(
  						{[classes.rowHelperText]: row === 'all'},
  						FormHelperTextProps && FormHelperTextProps.className,
  					)}
  				>
  					{helperText}
  				</FormHelperText>
  			)}
  		</FormControl>
  	);
  }
}

export default withStyles(styles)(RadioGroup);