import React from 'react';

import ODataStore from 'devextreme/data/odata/store';

import DataGrid, {
  Column,
  Grouping,
  GroupPanel,
  Pager,
  Paging,
  SearchPanel
} from 'devextreme-react/data-grid';



const pageSizes = [10, 25, 50, 100];

const dataSourceOptions = {
  store: new ODataStore({
    url: 'http://localhost:60447/api/SampleData',
  })
};

class TableGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
    this.onContentReady = this.onContentReady.bind(this);
  }
  render() {
    return (
      <DataGrid
        dataSource={dataSourceOptions}
        allowColumnReordering={true}
        showBorders={true}
        onContentReady={this.onContentReady}
      >
        <GroupPanel visible={true} />
        <SearchPanel visible={true} highlightCaseSensitive={true} />
        <Grouping autoExpandAll={false} />

        <Column dataField="Region" groupIndex={0} />
         <Column
          dataField="County"
          caption="County"
          dataType="string"
          alignment="left"
        /> 
         <Column
          dataField="City"
          caption="City"
          dataType="string"
          alignment="left"
        />

        <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
        <Paging defaultPageSize={10} />
      </DataGrid>
    );
  }

  onContentReady(e) {
    if (!this.state.collapsed) {
      e.component.expandRow(['EnviroCare']);
      this.setState({
        collapsed: true
      });
    }
  }
}


export default TableGrid;
