import React from 'react';
import PivotGrid, {
  FieldChooser,
  Scrolling,
  FieldPanel,
  Export
} from 'devextreme-react/pivot-grid';
import CheckBox from 'devextreme-react/check-box';
import ExcelJS from 'exceljs';
import saveAs from 'file-saver';
import { exportPivotGrid } from 'devextreme/excel_exporter';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';
import './styles.css';
import data from '../ArrayData/csv-data.js'

class PivotCsv extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showColumnFields: true,
      showDataFields: true,
      showFilterFields: true,
      showRowFields: true,
      showTotalHeaderGrid: true,
      TotalHeaderGrid: 'standard'
    };
    this.onShowColumnFieldsChanged = this.onShowColumnFieldsChanged.bind(this);
    this.onShowDataFieldsChanged = this.onShowDataFieldsChanged.bind(this);
    this.onShowFilterFieldsChanged = this.onShowFilterFieldsChanged.bind(this);
    this.onShowRowFieldsChanged = this.onShowRowFieldsChanged.bind(this);
    this.onContextMenuPreparing = this.onContextMenuPreparing.bind(this);
    this.onShowTotalHeaderGrid = this.onShowTotalHeaderGrid.bind(this);
  }

  onShowColumnFieldsChanged(e) {
    this.setState({ showColumnFields: e.value });
  }

  onShowDataFieldsChanged(e) {
    this.setState({ showDataFields: e.value });
  }

  onShowTotalHeaderGrid(e){
    this.state.TotalHeaderGrid =  this.state.TotalHeaderGrid == 'tree' ? 'standard' : 'tree';
    this.setState({ TotalHeaderGrid:this.state.TotalHeaderGrid, showTotalHeaderGrid: e.value });
  }

  onShowFilterFieldsChanged(e) {
    this.setState({ showFilterFields: e.value });
  }

  onShowRowFieldsChanged(e) {
    this.setState({ showRowFields: e.value });
  }

  onContextMenuPreparing(e) {
    var sourceField = e.field;

    if (sourceField) {
      if(!sourceField.groupName || sourceField.groupIndex === 0) {
        e.items.push({
          text: 'Hide field',
          onItemClick: function() {
            var fieldIndex;
            if(sourceField.groupName) {
              fieldIndex = dataSource.getAreaFields(sourceField.area, true)[sourceField.areaIndex].index;
            } else {
              fieldIndex = sourceField.index;
            }

            dataSource.field(fieldIndex, {
              area: null
            });
            dataSource.load();
          }
        });
      }

      if (sourceField.dataType === 'number') {
        var menuItems = [];

        e.items.push({ text: 'Summary Type', items: menuItems });
        ['Sum', 'Avg', 'Min', 'Max'].forEach(summaryType => {
          var summaryTypeValue = summaryType.toLowerCase();

          menuItems.push({
            text: summaryType,
            value: summaryType.toLowerCase(),
            onItemClick: function(args) {
              setSummaryType(args, sourceField);
            },
            selected: e.field.summaryType === summaryTypeValue
          });
        });
      }
    }
  }

  

  componentDidMount() {
  let valor = data.reduce((total,val) => {
    if(val.cc2 !=null) return total += val.cc2; 
  else return total},0)
 }

  render() {
    return (
      <React.Fragment>
        <PivotGrid
          id="sales"
          dataSource={dataSource}
          allowSortingBySummary={false}
          allowSorting={true}
          rowHeaderLayout={this.state.TotalHeaderGrid}
          allowFiltering={true}
          showBorders={true}
          height={490}
          onExporting={onExporting}
          onContextMenuPreparing={this.onContextMenuPreparing}
        >
          <FieldPanel
            showColumnFields={this.state.showColumnFields}
            showDataFields={this.state.showDataFields}
            showFilterFields={this.state.showFilterFields}
            showRowFields={this.state.showRowFields}
            allowFieldDragging={true}
            visible={true}
          />
          <Export enabled={true} />
          <FieldChooser height={500} />
          <Scrolling mode="virtual" />
        </PivotGrid>
        
        <div className="options">
          <div className="caption">Options</div>
          <div className="option">
            <CheckBox id="show-data-fields"
              value={this.state.showColumnFields}
              onValueChanged={this.onShowColumnFieldsChanged}
              text="Mostrar campos de coluna" />
          </div>
          &nbsp;
          <div className="option">
            <CheckBox id="show-row-fields"
              value={this.state.showDataFields}
              onValueChanged={this.onShowDataFieldsChanged}
              text="Mostrar campos de dados" />
          </div>
          &nbsp;
          <div className="option">
            <CheckBox
              value={this.state.showFilterFields}
              onValueChanged={this.onShowFilterFieldsChanged}
              text="Mostrar campos de filtro" />
          </div>
          &nbsp;
          <div className="option">
            <CheckBox 
              value={this.state.showRowFields}
              onValueChanged={this.onShowRowFieldsChanged}
              text="Mostrar campos de linha" />
          </div>
          &nbsp;
          <div className="option">
            <CheckBox 
              value={this.state.showTotalHeaderGrid}
              onValueChanged={this.onShowTotalHeaderGrid}
              text="Mostrar total no cabeçalho" />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const dataSource = new PivotGridDataSource({
  fields: [{
    caption: 'TipoMvConsulta',
    dataField: 'deTipoMvConsulta',
    width: 250,
    sortBySummaryField: 'ccTotal',
    sortBySummaryPath: [],
    sortOrder: 'desc',
    area: 'row'
  }, { 
    caption: 'Assunto',
    dataField: 'deAssunto',
    width: 250,
    sortBySummaryField: 'ccTotal',
    sortBySummaryPath: [],
    sortOrder: 'desc',
    area: 'row'
  },  {
    caption: 'Area',
    dataField: 'area',
    area: 'data',
    sortBySummaryField: 'ccTotal',
    sortOrder: 'desc',
    width: 250
  } , {
    caption: 'Cc1',
    dataField: 'cc1',
    width: 250,
    sortBySummaryField: 'ccTotal',
    summaryType: 'sum',
    sortOrder: 'desc',
    area: 'row'
  }, {
    caption: 'Cc2',
    dataField: 'cc2',
    width: 250,
    sortBySummaryField: 'ccTotal',
    summaryType: 'sum',
    sortOrder: 'desc',
    area: 'row'
  }, {
    caption: 'Cc3',
    dataField: 'cc3',
    width: 250,
    sortBySummaryField: 'ccTotal',
    summaryType: 'sum',
    sortOrder: 'desc',
    area: 'row'
  }, {
    caption: 'Cc4',
    dataField: 'cc4',
    width: 250,
    sortBySummaryField: 'ccTotal',
    summaryType: 'sum',
    sortOrder: 'desc',
    area: 'row'
  }, {
    caption: 'Cc5',
    dataField: 'cc5',
    width: 250,
    sortBySummaryField: 'ccTotal',
    summaryType: 'sum',
    sortOrder: 'desc',
    area: 'row'
  },{
    caption: 'Total',
    dataField: 'ccTotal',
    summaryType: 'sum',
    area: 'data'
  } ,{
    dataField: 'Id',
    visible: false
  }],
  store:data
});

function onExporting(e) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Consulta');

  exportPivotGrid({
    component: e.component,
    worksheet: worksheet
  }).then(() => {
    workbook.xlsx.writeBuffer().then((buffer) => {
      saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Tabela.xlsx');
    });
  });
  e.cancel = true;
}

function setSummaryType(args, sourceField) {
  dataSource.field(sourceField.index, {
    summaryType: args.itemData.value
  });

  dataSource.load();
}

export default PivotCsv;
