import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import isImage from '../../utils/isImage';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import Fab from '@material-ui/core/Fab';
import FormHelperText from '@material-ui/core/FormHelperText';
import grey from '@material-ui/core/colors/grey';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {
	preview: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
	},
	progress: {
		width: '100%',
	},
	progressColor: {
		backgroundColor: grey[300],
	},
	progressBarColor: {
		backgroundColor: grey[500],
		color: grey[100],
	},
	removeBtn: {
		transition: '.5s ease',
		position: 'absolute',
		opacity: 0,
		top: -5,
		right: -5,
		width: 40,
		height: 40,
	},
	smallPreviewImg: {
		height: 100,
		width: 'initial',
		maxWidth: '100%',
		color: 'rgba(0, 0, 0, 0.87)',
		transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
		boxSizing: 'border-box',
		boxShadow: 'rgba(0, 0, 0, 0.12) 0 1px 6px, rgba(0, 0, 0, 0.12) 0 1px 4px',
		borderRadius: 2,
		zIndex: 5,
	},
	imageContainer: {
		position: 'relative',
		zIndex: 10,
		textAlign: 'center',
		'&:hover $smallPreviewImg': {
			opacity: 0.3,
		},
		'&:hover $removeBtn': {
			opacity: 1,
		},
	},
};

const opacity = file => ({opacity: file.uploaded ? file.error ? 0.1 : 1 : 0.5});
function PreviewList(props) {
	const {files = [], handleRemove, showFileNames, FormHelperTextProps, classes} = props;
	if (!files.length) return null;
	return (
		<Grid container style={{padding: '8px'}}>
			{
				files.map((file, i) => (
					<Grid item key={i} className={classes.imageContainer}>
						<div className={classes.preview}>
							{(isImage(file) ?
								<img className={classes.smallPreviewImg} role='presentation' src={file.preview} style={opacity(file)}/>
								:
								<AttachFileIcon className={classes.smallPreviewImg} style={opacity(file)}/>
							)}
							{!file.uploaded && <LinearProgress classes={{root: classes.progress, colorPrimary: classes.progressColor, barColorPrimary: classes.progressBarColor}}/>}
							{(file.error || showFileNames) && <FormHelperText {...FormHelperTextProps} error={Boolean(file.error)}>{file.error || file.name}</FormHelperText>}
						</div>
						<Fab onClick={handleRemove(i)}
							aria-label='Delete'
							className={classes.removeBtn}>
							<DeleteIcon/>
						</Fab>
					</Grid>
				))
			}
		</Grid>
	);
}

export default withStyles(styles)(PreviewList);