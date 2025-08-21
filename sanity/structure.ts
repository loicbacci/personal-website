import type { StructureResolver } from 'sanity/structure';

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    // .items(S.documentTypeListItems())
    .items([
      // Add index page structure item
      S.listItem()
        .title('Index Page')
        .child(S.document().schemaType('index-info').documentId('index-info')),
      // Remove index info from other types
      ...S.documentTypeListItems().filter(
        (item) => !['index-info'].includes(<string>item.getId())
      ),
    ]);
