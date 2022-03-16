import React from "react";
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import { Pagination } from 'rsuite';
import 'rsuite-table/lib/less/index.less';
import {
  RECORD_PAGE_LIMIT
} from "../../utility/constants";

const PaginationTable = ({ records, total, page, setPage, columns }) => {
  return (
    <div className="row">
      <div className="col-12">
        <Table height={700}  data={records}>
          {columns.map((tCell, tCellIndex) => {
            return (
              <Column key={tCellIndex} width={tCell.size} >
                <HeaderCell>{tCell.name}</HeaderCell>
                {tCell.isRender ? <Cell >
                  {tCell.render}
                </Cell> : <Cell dataKey={tCell.key} />}
              </Column>
            );
          })}
        </Table>
        <div style={{ padding: 20 }}>
          <Pagination
            prev
            next
            first
            last
            ellipsis
            boundaryLinks
            maxButtons={5}
            size="xs"
            layout={['total', '-', '|', 'pager']}
            total={total}
            limit={RECORD_PAGE_LIMIT}
            activePage={page}
            onChangePage={setPage}
          />
        </div>
      </div>
    </div>
  );
};

export default PaginationTable;
