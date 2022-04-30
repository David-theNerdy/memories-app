// import React, {
//   forwardRef,
//   memo,
//   useEffect,
//   useImperativeHandle,
//   useMemo,
//   useRef,
//   useState,
// } from 'react';
// import ReactDOM from 'react-dom';
// import { useDispatch } from 'react-redux';
// import { getOrders } from '../../actions/purchases';
// import { useSelector } from 'react-redux';
// import ChildMessageRenderer from '../ChildMessageRenderer.js';


// import { DataGrid, GridToolbar } from '@mui/x-data-grid';
// import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-community/dist/styles/ag-grid.css';
// import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

// import axios from 'axios';




// const ordersColumns = [
//   { field: 'userId', headerName: 'userId', width: 200,
//     cellRenderer: "agGroupCellRenderer",
//     headerCheckboxSelection: true,
//     headerCheckboxSelectionFilteredOnly: true,
//     checkboxSelection: true  
//   },
//   { field: 'items', headerName: 'items', width: 340, editable: true, sortable: true },
//   {
//     headerName: "Child/Parent",
//     field: "button",
//     cellRenderer: "childMessageRenderer",
//     colId: "params",
//     width: 180
//   },
//   { field: 'name', headerName: 'name', width: 120, editable: false, sortable: true },
//   { field: 'address', headerName: 'address', width: 300, editable: false, sortable: true },
//   { field: 'phone', headerName: 'phone', width: 80, sortable: true }, 
//   // { field: 'total', headerName: 'total', width: 80, sortable: true },
//   { 
//     field: 'state',
//     cellRenderer: MoodRenderer,
//     cellEditor: MoodEditor,
//     cellEditorPopup: true,
//     editable: true,
//     width: 100, 
//   },
//   { field: 'createdAt', headerName: 'createdAt', width: 160, sortable: true },
// ]
// const frameworkComponents = {
//   childMessageRenderer: ChildMessageRenderer
// };
// const KEY_ENTER = 'Enter';

// export default function DataGridDemo() {
//   const dispatch = useDispatch();
//   const {purchases} = useSelector((state) => state.purchases);
//   const [rows, setRows] = useState([]);


//   const url = 'http://localhost:5000';
//   const fetchOrders = () => axios.get(`${url}/purchase`);

//   useEffect( () =>{
//      const fetchData = async () => {
//        await fetchOrders().then(res => setRows(res.data));
//       };
//       fetchData();
//   }, []);



//   const handleSummit = (event) => {
//     if(event.data.state !== 'done' && event.data.state !== 'in process' && event.data.state !== 'pending'){
//       alert('state must be `done`, `in process` or `pending`')
//       window.location.reload()
//       return
//     }else{
//       console.log('Data after change is', event.data);

//       setRows([...rows.filter((row) => row.id !== event.data.id), event.data]);
//     }

//   };
  

//   return (
//     <>
//       <div className="ag-theme-alpine" style={{height: 400, width: `95vw`}}>
//           <AgGridReact
//               rowData={rows}
//               columnDefs={ordersColumns}
//               onCellValueChanged={handleSummit}
//               frameworkComponents={frameworkComponents}
//               >
//           </AgGridReact>
//       </div>
//     </>
// );
// }






import React, {forwardRef, memo, useMemo, useState, useRef, useEffect, useImperativeHandle} from "react";
import ReactDOM from 'react-dom';
import { Modal, Button, Box, Typography } from '@mui/material'
import axios from "axios";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import ChildMessageRenderer from "../ProductDetails/ChildMessageRenderer";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';


const url = 'http://localhost:5000';


const style = {
  position: 'absolute',
  overflow: 'auto',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: 600,
  bgcolor: 'background.paper',
  boxShadow: 14,
  backgroundColor: '#f5f5f5',
  padding: '20px',
};

const styleOrders = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
  gridGap: '1rem',
  gridAutoFlow: 'row dense',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '10px 0 ',
  borderBottom: '1px solid #000',
}


export default class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      columnDefs: [
        {
          field: "userId",
          cellRenderer: "agGroupCellRenderer",
          headerCheckboxSelection: true,
          headerCheckboxSelectionFilteredOnly: true,
          checkboxSelection: true
        },
        { field: "name",
          width: 140,
        },
        { field: "address" },
  // { field: 'items', headerName: 'items', width: 340, editable: true, sortable: true },
        {
          field: "phone",
          width: 100, 
        },
        { 
          field: 'state',
          editable: false,
          width: 100, 
        },
        { field: "createdAt" },
        {
          headerName: "Order",
          field: "items",
          cellRenderer: "childMessageRenderer",
          colId: "params",
          width: 140,
          editable: false
        }
      ],
      defaultColDef: {
        sortable: true,
        /*filter: true,
        checkboxSelection: true,*/
        filter: "agTextColumnFilter",
        editable: true,
        resizable: true
      },
      // detailCellRendererParams: {
      //   detailGridOptions: {
      //     columnDefs: [
      //       { field: "callId" },
      //       { field: "direction" },
      //       { field: "number" },
      //       {
      //         field: "duration",
      //         valueFormatter: "x.toLocaleString() + 's'"
      //       },
      //       { field: "switchCode" }
      //     ],
      //     defaultColDef: {
      //       enableValue: true,
      //       enablePivot: true,
      //       sortable: true,
      //       filter: "agTextColumnFilter",
      //       /*filter: true,
      //       checkboxSelection: true,
      //       filter: "agTextColumnFilter",*/
      //       resizable: true
      //     },
      //     onFirstDataRendered: function(params) {
      //       params.api.sizeColumnsToFit();
      //     }
      //   },
      //   getDetailRowData: function(params) {
      //     params.successCallback(params.data.callRecords);
      //   },
      //   template:
      //     '<div style="height: 100%; background-color: #edf6ff; padding: 20px; box-sizing: border-box;">' +
      //     '  <div style="height: 10%;">Call Details</div>' +
      //     '  <div ref="eDetailGrid" style="height: 90%;"></div>' +
      //     "</div>"
      // },
      rowData: [],
      excelStyles: [
        {
          id: "indent-1",
          alignment: { indent: 1 },
          dataType: "string"
        }
      ],
      searchResult: null,
      sideBar: {
        toolPanels: [
          "columns",
          {
            id: "filters",
            labelKey: "filters",
            labelDefault: "Filters",
            iconKey: "menu",
            toolPanel: "agFiltersToolPanel"
          }
        ],
        defaultToolPanel: ""
      },
      context: { componentParent: this },
      frameworkComponents: {
        childMessageRenderer: ChildMessageRenderer
      },
      indexRow: {
        enable: true,
        field: 'items'
      }
    };
  }

  componentDidMount() {
    // fetch(
    //   /* "https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinners.json"*/
    //   "https://raw.githubusercontent.com/ag-grid/ag-grid-docs/latest/src/javascript-grid-master-detail/string-template-customisation/data/data.json"
    // )
    //   .then(result => result.json())
    //   .then(rowData => this.setState({ rowData }));

    const fetchOrders = () => axios.get(`${url}/purchase`).then(rowData => this.setState( {rowData : rowData.data} ));
    fetchOrders();
  }

  toggleModal = () => {
    this.setState({ modal: !this.state.modal });
  };

  // Export Exel
  onBtnExportDataAsExcel = () => {
    this.gridApi.exportDataAsExcel();
  };

  // Expand row and apper another table
  onFirstDataRendered = params => {
    params.api.sizeColumnsToFit();
    /*setTimeout(function() {
      params.api.getDisplayedRowAtIndex(1).setExpanded(true);
    }, 0);*/
  };

  // general search
  onQuickFilterChanged = () => {
    this.gridApi.setQuickFilter(document.getElementById("quickFilter").value);
  };

  clearFilters = () => {
    this.gridApi.setFilterModel(null);
    this.gridApi.onFilterChanged();
  };

  methodFromParent = items => {
    this.toggleModal();
    this.setState({
      indexRow: this.state.rowData[items]
    });
  };
  
  handleFinishOrder = (id) => {
    console.log(id)
    const fetchFinishOrder = () => axios.patch(`${url}/purchase/${id}`).then(() =>
      alert(`Order ${id} finished`)
    ).catch(err => alert(err));
    fetchFinishOrder();
  }
  render() {
    return (
      <>
        {/* Modal */}
        <Modal open={this.state.modal} 
          onClose={() => this.setState({ modal: false })}

          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >

          <Box style={style}>
              <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Typography id="modal-modal-title" variant="h6" component="h2" >
                    Orders for {this.state.indexRow.name}
                </Typography>
                <Typography id="modal-modal-title" variant="h6" component="h6" >
                    Current state: {this.state.indexRow.state}
                </Typography>
                <button onClick={() => this.handleFinishOrder(this.state.indexRow._id)}>
                  Finish Order
                </button>
              </div>
              <Typography id="modal-modal-description" variant="body2" component="p">
                Total:
              </Typography>
              <div>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))'}}>
                  <div>Product Name</div>
                  <div>Price</div>
                  <div>Quantity</div>
                </div>
              {this.state.indexRow.items?.map((el, index) => (
                <div key={index} style={styleOrders}>
                  <div>{el.product.name}</div>
                  <div>{el.product.price}</div>
                  <div>{el.quantity}</div>
                </div>
              ))}
              

              </div>
           </Box>
        </Modal>



        <div className="data-table">

          <div
            id="myGrid"
            className="ag-theme-balham"
            style={{ height: "500px", width: "100%" }}
          >
            <AgGridReact
              onGridReady={params => (this.gridApi = params.api)}
              rowSelection="multiple"
              columnDefs={this.state.columnDefs}
              defaultColDef={this.state.defaultColDef}
              sideBar={this.state.sideBar}
              groupSelectsChildren={true}
              pagination={true}
              paginationPageSize={this.state.paginationPageSize}
              paginateChildRows={true}
              autoGroupColumnDef={this.state.autoGroupColumnDef}
              rowData={this.state.rowData}
              excelStyles={this.state.excelStyles}
              onFirstDataRendered={this.onFirstDataRendered}
              detailCellRendererParams={this.state.detailCellRendererParams}
              floatingFilter={true}
              cacheQuickFilter={true}
              isExternalFilterPresent={this.isExternalFilterPresent}
              doesExternalFilterPass={this.doesExternalFilterPass}
              suppressMenuHide={true}
              frameworkComponents={this.state.frameworkComponents}
              context={this.state.context}
            />
          </div>
        </div>
      </>
    );
  }
}
