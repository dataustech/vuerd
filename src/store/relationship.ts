import Vue from "vue";
import Vuex from "vuex";
import {
  relationshipAdd,
  relationshipDraw,
  relationshipDrawStart,
  relationshipDrawStartAdd,
  relationshipDrawEnd,
  relationshipDrawStop,
  relationshipIdentification,
  relationshipIdentificationAll,
  relationshipRemoveTable,
  relationshipRemoveColumn,
  relationshipActive,
  relationshipActiveEnd
} from "./relationship/relationshipController";
import { Table } from "./table";
import { dataInit } from "@/data/relationship";

Vue.use(Vuex);

export interface State {
  relationships: Relationship[];
  draw: RelationshipDraw | null;
}

export const enum RelationshipType {
  ZeroOne = "ZeroOne",
  ZeroOneN = "ZeroOneN",
  ZeroN = "ZeroN",
  One = "One",
  OneN = "OneN",
  OneOnly = "OneOnly",
  N = "N"
}

export const enum Direction {
  left = "left",
  right = "right",
  top = "top",
  bottom = "bottom"
}

export interface Relationship {
  id: string;
  identification: boolean;
  relationshipType: RelationshipType;
  start: Point;
  end: Point;
}

export interface Point {
  tableId: string;
  columnIds: string[];
  x: number;
  y: number;
  direction: Direction;
}

export interface RelationshipDraw {
  relationshipType: RelationshipType;
  start: PointDrawStart | null;
  end: PointDrawEnd;
}

export interface PointDrawStart {
  table: Table;
  x: number;
  y: number;
}

export interface PointDrawEnd {
  x: number;
  y: number;
}

export const enum Commit {
  init = "init",
  load = "load",
  relationshipAdd = "relationshipAdd",
  relationshipDraw = "relationshipDraw",
  relationshipDrawStart = "relationshipDrawStart",
  relationshipDrawStartAdd = "relationshipDrawStartAdd",
  relationshipDrawEnd = "relationshipDrawEnd",
  relationshipDrawStop = "relationshipDrawStop",
  relationshipIdentification = "relationshipIdentification",
  relationshipIdentificationAll = "relationshipIdentificationAll",
  relationshipRemoveTable = "relationshipRemoveTable",
  relationshipRemoveColumn = "relationshipRemoveColumn",
  relationshipActive = "relationshipActive",
  relationshipActiveEnd = "relationshipActiveEnd"
}

export function createStore() {
  return new Vuex.Store<State>({
    state: {
      relationships: [],
      draw: null
    },
    mutations: {
      init(state: State) {
        const initData = dataInit() as any;
        const data = state as any;
        Object.keys(state).forEach(key => {
          data[key] = initData[key];
        });
      },
      load(state: State, load: State) {
        const stateData = state as any;
        const loadData = load as any;
        Object.keys(state).forEach(key => {
          if (loadData[key] !== undefined) {
            stateData[key] = loadData[key];
          }
        });
        state.draw = null;
      },
      relationshipAdd,
      relationshipDraw,
      relationshipDrawStart,
      relationshipDrawStartAdd,
      relationshipDrawEnd,
      relationshipDrawStop,
      relationshipIdentification,
      relationshipIdentificationAll,
      relationshipRemoveTable,
      relationshipRemoveColumn,
      relationshipActive,
      relationshipActiveEnd
    }
  });
}
