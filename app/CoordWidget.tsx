import { subclass, property } from "esri/core/accessorSupport/decorators";
import Widget = require("esri/widgets/Widget");
import watchUtils = require("esri/core/watchUtils");

import { renderable, tsx } from "esri/widgets/support/widget";

import Point = require("esri/geometry/Point");
import MapView = require("esri/views/MapView");

type Coordinates = Point | number[] | any;

interface Center {
  x: number;
  y: number;
}

interface State extends Center {
  interacting: boolean;
}

const CSS = {
  base: "coordWidget-tool"
};

interface CoordWidgetParams extends __esri.WidgetProperties {
  view: MapView,
  initialCenter: number[]
}


@subclass("esri.widgets.CoordWidget")
class CoordWidget extends Widget {
  constructor(params?: CoordWidgetParams) {
    super(params);
    this._onViewChange = this._onViewChange.bind(this);
  }

  postInitialize() {
    watchUtils.init(this, "view.center, view.interacting", () => this._onViewChange());

  }

  //--------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------

  //----------------------------------
  //  view
  //----------------------------------

  @property()
  @renderable()
  view: MapView;

  //----------------------------------
  //  initialCenter
  //----------------------------------

  @property()
  @renderable()
  initialCenter: Coordinates;

  //----------------------------------
  //  state
  //----------------------------------

  @property()
  @renderable()
  state: State;

  //-------------------------------------------------------------------
  //
  //  Public methods
  //
  //-------------------------------------------------------------------

  render() {
    const { x, y } = this.state;

    return (
      <div
        bind={this}
        class={CSS.base}>
        <p>Longitude: {Number(x).toFixed(3)}</p>
        <p>Latitude: {Number(y).toFixed(3)}</p>
      </div>
    );
  }

  //-------------------------------------------------------------------
  //
  //  Private methods
  //
  //-------------------------------------------------------------------

  private _onViewChange() {
    let { interacting, center } = this.view;
    this.state = {
      x: center.x,
      y: center.y,
      interacting
    };
  }
}

export = CoordWidget;