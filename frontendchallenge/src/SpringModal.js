import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs';
import './App.css';
// https://material-ui.com/components/modal/

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    width: '400px',
    height: '400px',
    overflowWrap: 'break-word',
    overflow: 'scroll',
    padding: theme.spacing(2, 4, 3)
  }
}));

// Animates the modal for the DNA sequences 
const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    }
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func
};

const prettyDNA = dna => {
  // create a span for every nucleotide
  // in our DNA strand, so that we can
  // format with a CSS color
  let out = [];
  const fmt = { A: 'dna_a', C: 'dna_c', G: 'dna_g', T: 'dna_t' };
  for (const nucleotide of dna) {
    out.push(<span className={fmt[nucleotide]}>{nucleotide}</span>);
  }
  return out;
};

export default function SpringModal(dna) {
  const classes = useStyles();
  // Truncate DNA for display on table
  let dna_short = dna.length > 10 ? dna.substring(0, 7) + '...' : dna;
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div onClick={handleOpen} style={{ cursor: 'pointer' }}>
        {dna_short}
      </div>
      <Modal
        aria-labelledby='spring-modal-title'
        aria-describedby='spring-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id='spring-modal-title'>Sequence</h2>
            <p id='spring-modal-description'>{prettyDNA(dna)}</p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
