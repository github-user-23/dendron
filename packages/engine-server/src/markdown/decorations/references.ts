import { position2VSCodeRange } from "@dendronhq/common-all";
import { NoteRefNoteV4 } from "../types";
import { Decorator } from "./utils";
import { DecorationWikilink, linkedNoteType } from "./wikilinks";

export const decorateReference: Decorator<NoteRefNoteV4, DecorationWikilink> = (
  opts
) => {
  const { node: reference, engine, note } = opts;
  const { position } = reference;

  const { type, errors } = linkedNoteType({
    fname: reference.data.link.from.fname,
    anchorStart: reference.data.link.data.anchorStart,
    anchorEnd: reference.data.link.data.anchorEnd,
    vaultName: reference.data.link.data.vaultName,
    engine,
    note,
  });
  const decoration: DecorationWikilink = {
    type,
    range: position2VSCodeRange(position),
  };

  return { errors, decorations: [decoration] };
};