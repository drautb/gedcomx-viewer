var GX_COUPLE = "http://gedcomx.org/Couple";
var GX_PARENT_CHILD = "http://gedcomx.org/ParentChild";

/*
   Take a Gedcomx document of a record (or a portion of a tree), and create a RelatioshipGraph, with
     gx: GedcomX object
       persons[]
         names[]
           nameForms[].fullText
         facts[]
           date.original
           place.original
       relationships[].type
         person1, person2

     personNodes[]: array of PersonNode object, each with:
       personId: JEncoded person ID
       name: First full name form full text
       gender: "M", "F" or null
       person: GedcomX person object
       personDiv: <div> of person
       parentFamilies[]: Array of FamilyNode for families where this person is a child.
       spouseFamilies[]: Array of FamilyNode for families where this person is a parent (or spouse).

     familyNodes: map of familyId -> FamilyNode object, each with:
       familyId: Husband person ID (or "?") + "+" + wife person ID (or "?"). Must not be "?+?".
       father: PersonNode of husband/father in family.
       mother: PersonNode of wife/mother in family.
       children[]: array of PersonNodes of children.
       coupleRel: GedcomX relationship for the couple (if any).
       fatherRels[]: GedcomX relationship between the father and each child with the corresponding index.
       motherRels[]: GedcomX relationship between the mother and each child with the corresponding index.
     if needed:
       personMap: map of personId -> PersonNode
       familyMap: map of familyId -> FamilyNode
     personDivs: HTML node for <div id="#personNodes">.

 */
function buildGraph(gx, prevChart) {
  try {
    var graph = new RelationshipGraph(gx);
    return new RelChartBuilder(graph, $("#personNodes"), $("#familyLines"), true, true).buildChart(prevChart);
  }
  catch (err) {
    console.log(err);
  }
}

/*
Todo:
_ Update when record updated
_ Optimize horizontal arrangement of FamilyLines toi minimize line-crossings.
_ Add a "dot" (square; triangle) where a PersonLine meets a FamilyLine.

 */