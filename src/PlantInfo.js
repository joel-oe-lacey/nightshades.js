// eslint-disable-next-line no-unused-vars
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(() => ({
}));

const createData = (field, value) => {
    if (value) {
        return { field, value };
    }

    return null;
}

const PlantInfo = ({ plantData }) => {
    const classes = useStyles();

    // See Trefle documentation for exact field definitions
    // https://docs.trefle.io/docs/advanced/plants-fields
    const { year, bibliography, author, family_common_name, main_species } = plantData;

    const rows = [
        createData('Family Common Name', family_common_name),
        createData('Family Scientific Name', main_species?.family),
        createData('Genus', main_species?.genus),
        createData('Year Named', year),
        createData('Publication Named', `${bibliography} - ${author}`),
        createData('Common Names', main_species?.common_names?.en?.join(', ')),
        createData('Distribution (Native)', main_species?.distribution?.native?.join(', ')),
        createData('Distribution (Introduced)', main_species?.distribution?.introduced?.join(', ')),
    ].filter(el => el != null);

    //other nested data still available to add

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Field</TableCell>
                        <TableCell align="right">Value</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <TableRow key={row.field}>
                        <TableCell component="th" scope="row">
                            {row.field}
                        </TableCell>
                        <TableCell align="right">
                            {row.value}
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default PlantInfo;