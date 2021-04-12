import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';

import React from 'react';
import { createStore } from 'devextreme-aspnet-data-nojquery';

import Chart, {
  AdaptiveLayout,
  CommonSeriesSettings,
  Size,
  Tooltip,
} from 'devextreme-react/chart';

import PivotGrid, {
  FieldChooser
} from 'devextreme-react/pivot-grid';

const dataSource = {
    remoteOperations: true,
    store: createStore({
      key: 'OrderID',
      loadUrl: 'http://localhost:60447/api/SampleData'
    }),
    fields: [{
      caption: 'Region',
      dataField: 'Region',
      width: 250,
      expanded: true,
      sortBySummaryField: 'Amount',
      sortBySummaryPath: [],
      sortOrder: 'desc',
      area: 'row'
    },{
      caption: 'Country',
      dataField: 'Country',
      area: 'row',
      sortBySummaryField: 'Amount',
      sortBySummaryPath: [],
      sortOrder: 'desc',
      width: 250
    }, {
      caption: 'Date',
      dataField: 'Date',
      dataType: 'date',
      area: 'column'
    }, {
      caption: 'Amount',
      dataField: 'Amount',
      summaryType: 'sum',
      format: 'currency',
      area: 'data'
    }, {
      dataField: 'Id',
      visible: false
    }]
  };
  
class PivotChartWebApi extends React.Component {

    componentDidMount() {
        this._pivotGrid.bindChart(this._chart, {
          dataFieldsDisplayMode: 'splitPanes',
          alternateDataFields: false
        });
        /* setTimeout(function() {
          dataSource.expandHeaderItem('row', ['Europe']);
          dataSource.expandHeaderItem('column', [2013]);
        }); */
      }

    render() {
        return (
          <React.Fragment>
            <Chart ref={(ref) => this._chart = ref.instance}>
              <Size height={200} />
              <Tooltip enabled={true} customizeTooltip={customizeTooltip} />
              <CommonSeriesSettings type="bar" />
              <AdaptiveLayout width={450} />
            </Chart>
    
            <PivotGrid
              id="pivotgrid"
              dataSource={dataSource}
              allowSortingBySummary={true}
              allowFiltering={true}
              showBorders={true}
              showColumnTotals={false}
              showColumnGrandTotals={false}
              showRowTotals={false}
              showRowGrandTotals={false}
              ref={(ref) => this._pivotGrid = ref.instance}
            >
              <FieldChooser enabled={true} height={400} />
            </PivotGrid>
          </React.Fragment>
        );
    }
}

const currencyFormatter = new Intl.NumberFormat(
    'en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }
  );

function
 customizeTooltip(args) {
    const valueText = currencyFormatter.format(args.originalValue);
    return {
      html: `${args.seriesName} | Total<div class="currency">${valueText}</div>`
    };
  }
export default PivotChartWebApi;