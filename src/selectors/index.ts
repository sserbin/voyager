import {SpecQueryModelGroup} from 'compassql/build/src/model';
import {Query} from 'compassql/build/src/query/query';
import {recommend} from 'compassql/build/src/recommend';
import {Schema} from 'compassql/build/src/schema';
import {SHORT_WILDCARD} from 'compassql/build/src/wildcard';
import {StateWithHistory} from 'redux-undo';
import {createSelector} from 'reselect';
import {InlineData, NamedData, UrlData} from 'vega-lite/build/src/data';

import {Shelf, ShelfFieldDef, State, StateBase, toQuery} from '../models';

export const getData = (state: State) => state.present.dataset.data;
const getShelf = (state: State) => state.present.shelf;
const getSchema = (state: State) => state.present.dataset.schema;

export const getQuery = createSelector(
  getShelf,
  (shelf: Shelf) => {
    return toQuery(shelf);
  }
);

export const getMainResult = createSelector(
  getQuery, getSchema, getData,
  (query: Query, schema: Schema): SpecQueryModelGroup => {
    return recommend(query, schema).result;
  }
);


const ALL_PRESET_WILDCARD_FIELDS: ShelfFieldDef[] = [
  {field: SHORT_WILDCARD, type: 'quantitative', title: 'Quantitative Fields'},
  {field: SHORT_WILDCARD, type: 'nominal', title: 'Categorical Fields'},
  {field: SHORT_WILDCARD, type: 'temporal', title: 'Temporal Fields'},
];

export const getPresetWildcardFields = createSelector(
  getSchema,
  (schema: Schema): ShelfFieldDef[] => {
    const typeIndex = schema.fieldSchemas.reduce((index, fieldSchema) => {
      index[fieldSchema.type] = true;
      return index;
    }, {});

    return ALL_PRESET_WILDCARD_FIELDS.filter(fieldDef => typeIndex[fieldDef.type]);
  }
);


export const getSchemaFieldDefs = createSelector(
  getSchema,
  (schema: Schema): ShelfFieldDef[] => {
    return schema.fieldSchemas.map(fieldSchema => {
      const {field, type} = fieldSchema;
      return {field, type};
    });
  }
);
