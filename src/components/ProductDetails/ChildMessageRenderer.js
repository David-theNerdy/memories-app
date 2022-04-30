import React, { Component } from "react";

export default class ChildMessageRenderer extends Component {
  constructor(props) {
    super(props);

    this.invokeParentMethod = this.invokeParentMethod.bind(this);
  }

  invokeParentMethod() {
    this.props.context.componentParent.methodFromParent(
      this.props.node.rowIndex
    );
  }

  render() {
    return (
      <span>
        <button
          style={{ height: 20, lineHeight: 0.5 }}
          onClick={this.invokeParentMethod}
          className="btn btn-info"
        >
          Details
        </button>
      </span>
    );
  }
}






// import React from 'react'
// import { Modal, Button, Box, Typography } from '@mui/material'

// const style = {
//   position: 'absolute',
//   top: '40%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 600,
//   bgcolor: 'background.paper',
//   boxShadow: 14,
//   p: 4,
// };
// const ChildMessageRenderer = () => {

//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const invokeParentMethod = () => {
  
//   }
//   return (
//       <span>
//         <Button
//           style={{ height: 20, lineHeight: 0.5 }}
//           onClick={() =>handleOpen()}
//           className="btn btn-info"
//         >
//           Details
//         </Button>

//         <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//         >
//           <Box sx={style}>
//             <Typography id="modal-modal-title" variant="h6" component="h2">
//               Text in a modal
//             </Typography>
//             <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//               Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
//             </Typography>
//           </Box>
//         </Modal>
//       </span>
//   )
// }

// export default ChildMessageRenderer