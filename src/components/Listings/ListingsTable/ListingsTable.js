import TableHead from '@material-ui/core/TableHead';
import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import paginationStyles from "./PaginationStyle";
import tableStyles from "./ListingsTableStyles";


function TablePaginationActions(props) {
  const classes = paginationStyles();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(address, neighborhood, rating, link) {
  return { address, neighborhood, rating, link };
}

const rows = [
  createData('417 E 57th St, New York', 'Sutton Place', "####", <a href="https://www.realtor.com/realestateandhomes-detail/417-E-57th-St_New-York_NY_10022_M93827-80821">realtor.com</a>),
  createData('417 E 57th St, New York', 'Sutton Place', "####", <a href="https://www.realtor.com/realestateandhomes-detail/417-E-57th-St_New-York_NY_10022_M93827-80821">realtor.com</a>),
  createData('417 E 57th St, New York', 'Sutton Place', "####", <a href="https://www.realtor.com/realestateandhomes-detail/417-E-57th-St_New-York_NY_10022_M93827-80821">realtor.com</a>),
  createData('417 E 57th St, New York', 'Sutton Place', "####", <a href="https://www.realtor.com/realestateandhomes-detail/417-E-57th-St_New-York_NY_10022_M93827-80821">realtor.com</a>),
  createData('417 E 57th St, New York', 'Sutton Place', "####", <a href="https://www.realtor.com/realestateandhomes-detail/417-E-57th-St_New-York_NY_10022_M93827-80821">realtor.com</a>),
  createData('417 E 57th St, New York', 'Sutton Place', "####", <a href="https://www.realtor.com/realestateandhomes-detail/417-E-57th-St_New-York_NY_10022_M93827-80821">realtor.com</a>),
  createData('417 E 57th St, New York', 'Sutton Place', "####", <a href="https://www.realtor.com/realestateandhomes-detail/417-E-57th-St_New-York_NY_10022_M93827-80821">realtor.com</a>),
  createData('417 E 57th St, New York', 'Sutton Place', "####", <a href="https://www.realtor.com/realestateandhomes-detail/417-E-57th-St_New-York_NY_10022_M93827-80821">realtor.com</a>),
  createData('417 E 57th St, New York', 'Sutton Place', "####", <a href="https://www.realtor.com/realestateandhomes-detail/417-E-57th-St_New-York_NY_10022_M93827-80821">realtor.com</a>),
  createData('417 E 57th St, New York', 'Sutton Place', "####", <a href="https://www.realtor.com/realestateandhomes-detail/417-E-57th-St_New-York_NY_10022_M93827-80821">realtor.com</a>),
  createData('417 E 57th St, New York', 'Sutton Place', "####", <a href="https://www.realtor.com/realestateandhomes-detail/417-E-57th-St_New-York_NY_10022_M93827-80821">realtor.com</a>),
  createData('417 E 57th St, New York', 'Sutton Place', "####", <a href="https://www.realtor.com/realestateandhomes-detail/417-E-57th-St_New-York_NY_10022_M93827-80821">realtor.com</a>),
  createData('417 E 57th St, New York', 'Sutton Place', "####", <a href="https://www.realtor.com/realestateandhomes-detail/417-E-57th-St_New-York_NY_10022_M93827-80821">realtor.com</a>),
]

export default function DataTable(props) {
  const classes = tableStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer className={classes.root} component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
      <TableHead>
           <TableRow>
             <TableCell>Address</TableCell>
             <TableCell align="right">Neighborhood</TableCell>
             <TableCell align="right">Crime Rating</TableCell>
             <TableCell align="right">Link</TableCell>
           </TableRow>
         </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row.name}>
               <TableCell component="th" scope="row">
                 {row.address}
               </TableCell>
               <TableCell align="right">{row.neighborhood}</TableCell>
               <TableCell align="right">{row.rating}</TableCell>
               <TableCell align="right">{row.link}</TableCell>
             </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}