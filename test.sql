

with "insertedNote" as (
    insert into "notes" ("notebookId", "noteTitle", "noteContent", "noteDifficulty", "noteResource", "noteCode")
    values (1, 'fun with Tim', 'filler content', 5,'[]' , '{}')
    returning *
), "insertedTags" as (
    insert into "tagTable" ("tagName")
    values ('Adam'), ('Tim'), ('HTML')
    on conflict ("tagName")
    do update
    set "updatedAt" = now()
    returning*
), "insertedTagRelations" as (
    insert into "tagRelations" ("itemId", "tagId", "type")
    select "noteId", "tagId", 'note' as "type"
    from "insertedNote", "insertedTags"
    on conflict ("itemId", "tagId", "type")
    do nothing
)

select "noteId" from "insertedNote";
