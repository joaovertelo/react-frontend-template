import React, { Component } from "react";
import _ from "lodash";

class PickList extends Component {
  constructor(props) {
    super(props);
    this.renderOptionsSource = this.renderOptionsSource.bind(this);
    this.renderOptionsTarget = this.renderOptionsTarget.bind(this);
    this.associar = this.associar.bind(this);
    this.associarTodos = this.associarTodos.bind(this);
    this.desassociar = this.desassociar.bind(this);
    this.desassociarTodos = this.desassociarTodos.bind(this);

    this.state = {
      listSource: [
        { value: 1, label: "Unidade 23" },
        { value: 2, label: "Onidade 2" }
      ],
      listTarget: []
    };
  }

  associar() {
    let e = $("#selectSource").val();
    if (e) {
      e = e.map(e => parseInt(e));
      let listTarget = this.state.listSource.filter(source =>
        e.includes(source.value)
      );
      let listSource = this.state.listSource.filter(
        source => !e.includes(source.value)
      );

      listTarget = _.concat(this.state.listTarget, listTarget);
      this.setState({ listSource, listTarget });
    }
  }

  associarTodos() {
    let listTarget = this.state.listSource;
    if (listTarget) {
      let listSource = [];
      listTarget = _.concat(this.state.listTarget, listTarget);
      this.setState({ listSource, listTarget });
    }
  }

  desassociar() {
    let e = $("#selectTarget").val();
    if (e) {
      e = e.map(e => parseInt(e));
      let listSource = this.state.listTarget.filter(target =>
        e.includes(target.value)
      );
      let listTarget = this.state.listTarget.filter(
        target => !e.includes(target.value)
      );

      listSource = _.concat(this.state.listSource, listSource);
      this.setState({ listSource, listTarget });
    }
  }

  desassociarTodos() {
    let listSource = this.state.listTarget;
    if (listSource) {
      let listTarget = [];
      listSource = _.concat(this.state.listSource, listSource);
      this.setState({ listSource, listTarget });
    }
  }

  renderOptionsSource() {
    let sourceSort = _.sortBy(this.state.listSource, "label");
    return sourceSort.map(unidade => (
      <option key={unidade.value} value={unidade.value}>
        {unidade.label}
      </option>
    ));
  }

  renderOptionsTarget() {
    let targetSort = _.sortBy(this.state.listTarget, "label");

    return targetSort.map(unidade => (
      <option key={unidade.value} value={unidade.value}>
        {unidade.label}
      </option>
    ));
  }

  render() {
    return (
      <div className="container col-sm-5">
        <div className="row">
          <div className="col-sm-5">
            <label>Unidades selecionadas</label>
            <div className="panel panel-default">
              <div className="panel-body">
                <select
                  onDoubleClick={this.associar}
                  style={{ width: "100%" }}
                  id="selectSource"
                  className="form-control"
                  multiple
                >
                  {this.renderOptionsSource()}
                </select>
              </div>
            </div>
          </div>

          <div className="col-sm-1">
            <div
              style={{
                paddingTop: 30
              }}
            >
              <button className="btn" onClick={this.associarTodos}>
                >>
              </button>
              <button className="btn" onClick={this.associar}>
                >
              </button>
              <button className="btn" onClick={this.desassociar}>
                {"<"}
              </button>
              <button className="btn" onClick={this.desassociarTodos}>
                {"<<"}
              </button>
            </div>
          </div>
          <div className="col-sm-5">
            <label>Todas Unidades</label>
            <div className="panel panel-default">
              <div className="panel-body">
                <select
                  onDoubleClick={this.desassociar}
                  style={{ width: "100%" }}
                  id="selectTarget"
                  className="form-control"
                  multiple
                >
                  {this.renderOptionsTarget()}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PickList;
