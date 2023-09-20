import React from 'react';
import styles from '../CSS/AI.module.css';

const TableDisplay = ({ getTableProps, headerGroups, getTableBodyProps, rows, prepareRow }) => {
    return (
        <div className={styles.tableContainer}>
            <table {...getTableProps()} style={{ margin: 'auto' }}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => (
                                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                ))}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default TableDisplay;
