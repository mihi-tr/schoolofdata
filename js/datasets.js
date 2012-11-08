var dataset;

function slugify(strn) {
  return strn.replace(/[^a-zA-Z0-9-]/g,"-").toLowerCase()
    }

function create_offsetlist() {
  for (var i=0; i<dataset.recordCount/10; i++) {
    data={offset:i*10,
      id:i,
      number:i+1};
    $("#ol").append(Mustache.render("<a class='btn btn-small' href='#'\
    onclick='show_dataset({{offset}})' id='ol-{{id}}'>{{number}}</a>",data))
    }
  }

function show_dataset(offset) {
  dataset.query({size:10, offset:offset}).done(function() {
  $("#datasources").empty();
      _.each(dataset.records.models, function(d) {
        $("#ol a").removeClass("active");
        $("#ol-"+(offset/10)).addClass("active");
        data={
          link: d.attributes.link,
          slug: slugify(d.attributes.name),
          title: d.attributes.name,
          description: d.attributes.description,
          category: d.attributes.category
          }
        $("#datasources").append(Mustache.render("<div class='accordion-group'>\
        <div class='accordion-heading'>\
        <a href='#{{slug}}' class='accordion-toggle' data-toggle='collapse' \
        data-parent='#datasources'>{{title}} <span class='label'>{{category}}</span>\
        </a>\
        </div>\
        <div class='accordion-body collapse' id='{{slug}}'>\
        <div class='accordion-inner'>\
        <p>{{description}}</p>\
        <a href='{{link}}' target='_new'>{{link}}</a>\
        </div></div></div>",data))
  })
  })
  }

$(document).ready(function() {
  var
url="https://docs.google.com/spreadsheet/ccc?key=0AlgwwPNEvkP7dDRxLXIxUzY1VGt0N0dyY0NMUWNiU3c#gid=0"
  dataset = new recline.Model.Dataset ({
    id:"datasets",
    url: url,
    backend: 'GDocs'
    });
    dataset.fetch().done(function() {
      create_offsetlist();
      show_dataset(0);
      })
  })

