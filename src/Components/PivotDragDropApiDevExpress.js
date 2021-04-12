import React from 'react';

import PivotGrid, {
  FieldChooser,
  Scrolling,
  FieldPanel
} from 'devextreme-react/pivot-grid';
import CheckBox from 'devextreme-react/check-box';

import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';
import './styles.css';
/* import sales from '../ArrayData/data.js'; */
import { createStore } from 'devextreme-aspnet-data-nojquery';
class PivotDragDropApiDevExpress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showColumnFields: true,
      showDataFields: true,
      showFilterFields: true,
      showRowFields: true
    };
    this.onShowColumnFieldsChanged = this.onShowColumnFieldsChanged.bind(this);
    this.onShowDataFieldsChanged = this.onShowDataFieldsChanged.bind(this);
    this.onShowFilterFieldsChanged = this.onShowFilterFieldsChanged.bind(this);
    this.onShowRowFieldsChanged = this.onShowRowFieldsChanged.bind(this);
    this.onContextMenuPreparing = this.onContextMenuPreparing.bind(this);
  }

  render() {
    return (
      <React.Fragment>
        <PivotGrid
          id="sales"
          dataSource={dataSource}
          allowSortingBySummary={true}
          allowSorting={true}
          allowFiltering={true}
          showBorders={true}
          height={490}
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
          <FieldChooser height={500} />
          <Scrolling mode="virtual" />
        </PivotGrid>
        <div className="options">
          <div className="caption">Options</div>
          <div className="option">
            <CheckBox id="show-data-fields"
              value={this.state.showColumnFields}
              onValueChanged={this.onShowColumnFieldsChanged}
              text="Mostrar campos de dados" />
          </div>
          &nbsp;
          <div className="option">
            <CheckBox id="show-row-fields"
              value={this.state.showDataFields}
              onValueChanged={this.onShowDataFieldsChanged}
              text="Mostrar campos de linha" />
          </div>
          &nbsp;
          <div className="option">
            <CheckBox id="show-column-fields"
              value={this.state.showFilterFields}
              onValueChanged={this.onShowFilterFieldsChanged}
              text="Mostrar campos de coluna" />
          </div>
          &nbsp;
          <div className="option">
            <CheckBox id="show-filter-fields"
              value={this.state.showRowFields}
              onValueChanged={this.onShowRowFieldsChanged}
              text="Mostrar campos de filtro" />
          </div>
        </div>
      </React.Fragment>
    );
  }

  onShowColumnFieldsChanged(e) {
    this.setState({ showColumnFields: e.value });
  }

  onShowDataFieldsChanged(e) {
    this.setState({ showDataFields: e.value });
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
}

const dataSource = new PivotGridDataSource({
  fields: [{
    caption: 'Categoria',
    dataField: 'ProductCategoryName',
    width: 250,
   /*  expanded: true, */
    sortBySummaryField: 'SalesAmount',
    sortBySummaryPath: [],
    sortOrder: 'desc',
    area: 'row'
  }, {
    caption: 'Subcategoria',
    dataField: 'ProductSubcategoryName',
    width: 250,
    sortBySummaryField: 'SalesAmount',
    sortBySummaryPath: [],
    sortOrder: 'desc',
    area: 'row'
  }, {
    caption: 'Produto',
    dataField: 'ProductName',
    area: 'row',
    sortBySummaryField: 'SalesAmount',
    sortBySummaryPath: [],
    sortOrder: 'desc',
    width: 250
  }, {
    caption: 'Data',
    dataField: 'DateKey',
    dataType: 'date',
    area: 'column'
  }, {
    caption: 'Valor',
    dataField: 'SalesAmount',
    summaryType: 'sum',
    format: 'currency',
    area: 'data'
  }, {
    caption: 'Loja',
    dataField: 'StoreName'
  }, {
    caption: 'Quantidade',
    dataField: 'SalesQuantity',
    summaryType: 'sum'
  }, {
    caption: 'Preço Uniario',
    dataField: 'UnitPrice',
    format: 'currency',
    summaryType: 'sum'
  }, {
    dataField: 'Id',
    visible: false
  }],
  remoteOperations: true,
  store: createStore({
    key: 'OrderID',
    loadUrl: 'https://js.devexpress.com/Demos/WidgetsGalleryDataService/api/Sales/Orders'
  })
});

function setSummaryType(args, sourceField) {
  dataSource.field(sourceField.index, {
    summaryType: args.itemData.value
  });

  dataSource.load();
}

export default PivotDragDropApiDevExpress;
