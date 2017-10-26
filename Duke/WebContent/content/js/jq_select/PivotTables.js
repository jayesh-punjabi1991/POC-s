/*
 * Developer : Sanjay Kumar (sanjay1982@gmail.com)
 * Date : 17/01/2013
 * All code (c)2013 all rights reserved
 */
/// <reference path="jquery-1.8.3.js" />
/// <reference path="jquery-ui-1.9.2.custom/js/jquery-ui-1.9.2.custom.js" />
(function ($, undefined) {

    $.widget("ali.pivot", {
        /*
        Options user can define.
        jsonData:
        Data can be supplied in the form of JSON object in follwing format.
        {ColumnName: [<<values>>,..]}
        or data can be in the base table element.    
        fields:
        */
        options: {
            jsonData: [],
            fields: [],
            rowFields: [],
            columnFields: [],
            valueFields: [],
            classFields: [],
            filterFields: [],
            showRunningTotal: false,
            showFieldLists: true
        },
        /*
        Field type definition.
        */
        _fieldType: {
            fieldName: "",
            displayName: function () {
                return this.fieldName;
            },
            summaryName: function () {
                return this.summaryType + " of " + this.fieldName;
            },
            summaryType: "Sum"
        },
        /*
        Summry types more can be added here.
        */
        _summaryTypes: {
            "Sum": function (obj) {
                obj.value = (+obj.value || 0);
                obj.total += obj.value;
                return obj.total; ;
            },
            "Count": function (obj) {
                obj.value = (obj.value && obj.value != 0) ? obj.value : false;
                obj.total += (obj.value ? 1 : 0);
                return obj.total;
            }
        },
        _filterData: [],
        _filteredRows: [],
        _fieldIndex: [],
        _fieldLists: {
            Filter: '',
            Column: '',
            Row: '',
            Value: '',
            Class: ''
        },
        _uiPivotContainer: null,
        _tableHeader: $('<th>').addClass("ui-state-default"),
        _create: function () {
            this.settings = $.extend(true, {}, this.options);
            var settings = this.settings, that = this;
            this._filterData = [];
            this._filteredRows = [];
            this._fieldIndex = [];
            this._fieldLists = {
                Filter: '',
                Column: '',
                Row: '',
                Value: '',
                Class: ''
            };

            for (var i in settings.fields) {
                var field = settings.fields[i];
                if (!$.isPlainObject(field)) {
                    settings.fields[i] = $.extend({}, this._fieldType, { fieldName: field + "" });
                }
            }
            if (!settings.jsonData || settings.jsonData.length == 0) {
                this._getData(this.element);
                this.element.html('');
            } else {
                this._getFilterData();
            }

            this._initFields();
            var _uiPivotContainer = (this._uiPivotContainer = $('<div class="ui-widget ui-helper-clearfix">').css({ 'font-size': '0.8em', 'padding': '0.2em' }));
            $(this.element).before(_uiPivotContainer);
            if (settings.showFieldLists) this._createFieldList();
            this._filteredRows = this._getAllRowIndex();
            this._refresh();
        },
        _init: function () {

        },
        _refresh: function () {
            this._createTable(this._filteredRows);
        },
        _initFields: function () {
            var settings = this.settings;
            var fieldIndex = (this._fieldIndex = []);
            for (var i in settings.fields) {
                var field = settings.fields[i] || this._fieldType, indx = -1, listToAddIn;
                fieldIndex[field.fieldName] = i;
                if ((indx = $.inArray(field.fieldName, settings.rowFields)) != -1) {
                    settings.rowFields[indx] = i;
                } else if ((indx = $.inArray(field.fieldName, settings.columnFields)) != -1) {
                    settings.columnFields[indx] = i;
                } else if ((indx = $.inArray(field.fieldName, settings.valueFields)) != -1) {
                    settings.valueFields[indx] = i;
                } else if ((indx = $.inArray(field.fieldName, settings.classFields)) != -1) {
                    settings.classFields[indx] = i;
                } else {
                    settings.filterFields.push(i);
                }
            }
            this._fieldLists = {
                Filter: settings.filterFields,
                Column: settings.columnFields,
                Row: settings.rowFields,
                Value: settings.valueFields,
                Class: settings.classFields
            };
        },
        _reset: function () {
            this._filterData.length = 0;
            this._filteredRows = null;
            this._fieldIndex.length = 0;
            if (this._uiPivotContainer) {
                this._uiPivotContainer.remove();
                this._uiPivotContainer = null;
            }
            for (var i in this.settings) {
                if ($.isArray(this.settings[i])) {
                    this.settings[i].length = 0;
                } else {
                    this.settings[i] = false;
                }

            }
        },
        /*
        *  Function Name:   _getData
        *  Description:     Get data from the table and initialize jsonData and filterData
        *  Parameters: 
        *        element: should be a jquery of table element.
        */
        _getData: function (element) {
            element = $(element);
            if (element.prop("tagName").toLowerCase() != 'table') throw "Element must be a table if no data is provided";
            var settings = this.settings;
            var that = this;
            //Look for fields[Column Names] in the headers of first row of table unless provided in settings.
            if (settings.fields.length == 0) {
                element.find('tr:first>').each(function (index) {
                    var name = $.trim($(this).text());
                    settings.fields.push($.extend({}, that._fieldType, { fieldName: name }));

                });
            }
            that._filterData.length = 0;
            settings.jsonData = [];
            //Find all data in table and initialize filterData and jsonData
            $(element).find('tr:gt(0)').each(function (indexRow) {
                $(this).find('td').each(function (indexCol) {
                    var colName = settings.fields[indexCol].fieldName;
                    settings.jsonData[colName] = settings.jsonData[colName] || []; //Initialize if not already
                    settings.jsonData[colName].push($(this).text());

                    //Add filter data for this column
                    that._filterData[colName] = that._filterData[colName] || []; //Initialize if not already

                    //Set rows in which this value appeared                
                    that._filterData[colName][$(this).text()] = that._filterData[colName][$(this).text()] || []; //Initialize if not already
                    that._filterData[colName][$(this).text()].push(settings.jsonData[colName].length - 1);
                });
            });
        },
        /*
        *  Function Name:   _getFilterData
        *  Description:  Fills _filterData array with unique values of each column and row indexes in whihc those value appears.
        *  Parameters: None
        *  Return: Filter Data
        */
        _getFilterData: function () {
            var settings = this.settings;
            that._filterData.length = 0;
            for (var colName in settings.jsonData) {
                var colData = settings.jsonData[colName];
                for (var index in colData) {
                    this._filterData[colName] = this._filterData[colName] || [];
                    this._filterData[colName][colData[index]] = this._filterData[colName][colData[index]] || [];
                    this._filterData[colName][colData[index]].push(index);
                }
            }
            return this._filterData;
        },
        /*
        *  Function Name:   _getFieldsFromUILists
        *  Description:  Gets the files from Ui field lists e.g. Row Fields, Column Fields, Filter Fields, Class Fields and Value Fields.
        *  Parameters: None
        *  Return: Field List with with column indexes
        */
        _getFieldsFromUILists: function () {
            var that = this;
            for (var listName in this._fieldLists) {
                var list = this.uiFieldLists.find('.ui-pivot-field-list-' + listName);
                if (list.length > 0) {
                    that._fieldLists[listName] = that._fieldLists[listName] || [];
                    that._fieldLists[listName].length = 0;
                    list.find('li .ui-pivot-field-text').each(function () {
                        that._fieldLists[listName].push(that._fieldIndex[$(this).text()]);
                    });
                }
            }
            return this._fieldLists;
        },
        /*
        *  Function Name:   _createFilterList
        *  Description:  Creates a UI for filters for the given fieldName 
        *  Parameters: fieldName : Name of the field for which to create filter list.
        *  Return: UI for the filter list.
        */
        _createFilterList: function (fieldName) {
            var that = this;
            var filter = that._uiPivotContainer.find('.ui-pivot-filter[title="' + fieldName + '"]');
            //If already created just return it.
            if (filter.length > 0)
                return filter;

            filter = $('<div class="ui-pivot-filter-list">');
            filter.append($('<label>').text('All Items').append($('<input type="checkbox" name="allitems">').prop('checked', true)));
            for (var item in that._filterData[fieldName]) {
                filter.append($('<label>').append($('<span>').text(item)).append($('<input type="checkbox">')));
            }

            filter.find(':checkbox').change(function () {
                var div = $(this).parents('div:first');
                var allitems = div.find(':checkbox[name="allitems"]');
                var rest = div.find(':checkbox[name!="allitems"]');
                if ($(this).attr('name') == 'allitems') {
                    rest.prop('checked', false);
                    $(this).prop('checked', true);
                } else if ($(this).is(':checked')) {
                    allitems.prop('checked', false);
                } else if ($(rest).not(this).filter(':checked').length == 0) {
                    allitems.prop('checked', true);
                }
            });
            var div = $('<div>').addClass('ui-pivot-filter ui-widget ui-widget-content ui-helper-clearfix ui-corner-all')
            .attr('title', fieldName)
            .append(filter)
            .append(
                $('<div>')
				.addClass("ui-widget-header ui-corner-all")
                .append(
                    $('<button>').text("Cancel").button().click(function () {
                        $(this).parent().parent().hide("slow");
                        that._asyncProcess.overlay(false);
                        return false;
                    }),
                     $('<button>').css('float','right').text("Ok").button().click(function () {
                         $(this).parent().parent().hide("slow");
                         that._asyncProcess.overlay(false);
                         that._filteredRows = null;
                         that._uiPivotContainer.find('.ui-pivot-filter').each(function () {
                             var filtered = [];
                             var clm = $(this).attr('title');
                             $(this).find(':checked[name!="allitems"]').each(function () {
                                 var rows = that._filterData[clm][$(this).parent().text()];
                                 filtered = filtered.concat(rows);
                             });
                             if (filtered.length > 0) {
                                 if (!that._filteredRows) that._filteredRows = filtered;
                                 else {
                                     for (var i = 0; i < that._filteredRows.length; i++) {
                                         if (filtered.indexOf(that._filteredRows[i]) < 0) {
                                             that._filteredRows.splice(i, 1);
                                             i--;
                                         }
                                     }
                                 }
                             }
                         });

                         that._refresh();
                         return false;
                     })
                 )
            ).hide();
            that._uiPivotContainer.append(div);
            return div;
        },
        _createSummaryTypeList: function (fieldName, currVal) {
            var that = this;
            var ulist = $('<select>').addClass("ui-pivot-sum-type").attr('name', fieldName);
            for (var i in this._summaryTypes) {
                var op = $('<option>').text(i);
                if (currVal == i) op.attr('selected', true);
                ulist.append(op);
            }
            ulist.change(function () {
                var fName = $(this).attr('name');
                var fIndx = that._fieldIndex[fName];
                that.settings.fields[fIndx].summaryType = $(this).val();
                that._refresh();
            });
            return ulist;
        },
        _createFieldList: function () {
            var settings = this.settings, that = this;
            var uiFieldLists = (this.uiFieldLists = $('<div>').addClass("ui-pivot-field-lists portlet-content"));
            for (var f in that._fieldLists) {

                var uiList = $('<ul>').addClass('ui-pivot-field-list ui-pivot-field-list-' + f);
                uiList.append($('<li>').addClass("ui-pivot-field-list-caption ui-state-highlight").text(f + " Field List"));
                for (var i in this._fieldLists[f]) {
                    var field = settings.fields[this._fieldLists[f][i]];
                    var filter = this._createFilterList(field.fieldName);
                    var li = $('<li>').append($('<span>').addClass('ui-pivot-field-text').text(field.fieldName));
                    li.append($('<button>').button({
                        icons: { primary: "ui-icon-triangle-1-s" },
                        text: false
                    }).click(function () {
                        var colName = $(this).prev('span').text();
                        var filter = that._createFilterList(colName);
                        that._uiPivotContainer.find('.ui-pivot-filter').hide('fast');
						filter.show('slow').position({ of: $(this).parent(), my: 'left top', at: 'left bottom' });
                        var overlay = that._asyncProcess.overlay(true, filter);
                        var z = overlay.css('z-index');
                        z = isNaN(z) ? 1 : z + 1;
                        filter.css('z-index',z)
						return false;
                    }));
                    li.append(that._createSummaryTypeList(field.fieldName, field.summaryType).hide());
                    uiList.append(li);
                }
                uiFieldLists.append(uiList);
            }
            uiFieldLists.append($('<div>').css('clear', 'both'));
            var portlet = $('<div>').addClass("portlet")
        .css({ margin: "1em 0" })
        .append(
            $('<div>')
            .addClass("portlet-header")
            .css({ margin: "0.3em", "padding-bottom": "4px", "padding-left": "0.2em" })
            .text('Options')
            .prepend($('<span>').addClass("ui-icon ui-icon-plusthick").css('float', "right"))
        );
            portlet.addClass("ui-widget ui-widget-content ui-helper-clearfix ui-corner-all")
            .find(".portlet-header")
            .addClass("ui-widget-header ui-corner-all")
            .find(".ui-icon").click(function () {
                $(this).toggleClass("ui-icon-minusthick").toggleClass("ui-icon-plusthick");
                $(this).parents(".portlet:first").find(".portlet-content").toggle();
            });
            uiFieldLists.append(
            $('<label>')
            .text('Show Running Total')
            .append(
                $('<input>').attr('type', "checkbox")
                .change(function () {
                    that.settings.showRunningTotal = $(this).is(':checked');
                    that._refresh();
                }).prop('checked', that.settings.showRunningTotal)
            )
        );
            uiFieldLists.append(
            $('<button>')
            .text('Clear All Filters')
            .click(function () {
                that._uiPivotContainer.find('.ui-pivot-filter :checked').prop('checked', false);
                that._uiPivotContainer.find('.ui-pivot-filter :checkbox[name="allitems"]').prop('checked', true);
                that._refresh();
                return false;
            })
        );
            this._uiPivotContainer.append(portlet.append(uiFieldLists.hide()));
            uiFieldLists.find('ul').sortable({
                connectWith: ".ui-pivot-field-list",
                placeholder: "ui-state-highlight",
                items: "li:not(.ui-pivot-field-list-caption)",
                stop: function (event, ui) {
                    if (ui.sender != null || ui.position != ui.originalPosition) {
                        that._getFieldsFromUILists();
                        that._refresh();
                    }
                }
            }).find('li').addClass('ui-state-default').find('span').disableSelection();
            uiFieldLists.find('ul.ui-pivot-field-list-Value').on("sortreceive", function (event, ui) {
                $(ui.item).find('.ui-pivot-sum-type').show();
            }).find('.ui-pivot-sum-type').show();
            uiFieldLists.find('ul.ui-pivot-field-list-Value').on("sortremove", function (event, ui) {
                $(ui.item).find('.ui-pivot-sum-type').hide();
            });

            return uiFieldLists;
        },
        _groupItems: function (rows) {
            var settings = this.settings;
            var tableItems = [], fieldLists = { rowFields: settings.rowFields, columnFields: settings.columnFields };
            $(rows).each(function () {
                var rowIndex = this;
                for (var fieldList in fieldLists) {
                    var curarray = (tableItems[fieldList] = tableItems[fieldList] || []);
                    for (var i in fieldLists[fieldList]) {
                        var indx = fieldLists[fieldList][i];
                        var field = settings.fields[indx];
                        curarray[settings.jsonData[field.fieldName][rowIndex]] = curarray[settings.jsonData[field.fieldName][rowIndex]] || [];
                        curarray = curarray[settings.jsonData[field.fieldName][rowIndex]];
                    }
                    curarray.push(rowIndex);
                }
            });
            return tableItems;
        },
        _getAllRowIndex: function () {
            var rows = [];
            for (var ri in this.settings.jsonData[this.settings.fields[0].fieldName]) {
                rows.push(ri);
            }
            return rows;
        },
        _asyncProcess: {
            toCall: [],
            _started: false,
            addFirst: function (fn, thisObj, args) {
                this.toCall.push([fn, thisObj, args]);
                this.start();
            },
            addLast: function (fn, thisObj, args) {
                this.toCall.splice(0, 0, [fn, thisObj, args]);
                this.start();
            },
            invoke: function (fn, thisObj, args) {
                fn = $.isFunction(fn) ? fn : thisObj[fn];
                if ($.isFunction(fn))
                    fn.apply(thisObj, args || []);
            },
            asyncCall: function (fn, thisObj, args) {
                var that = this;
                setTimeout(function () {
                    that.invoke(fn, thisObj, args);
                }, 1);
            },
            start: function () {
                if (!this._started) {
                    this._started = true;
                    this.overlay(true); 
                    this.asyncCall(this.process, this);
                }
            },
			overlay: function(show, ele){
				if(show && !this._overlay) {
					this._overlay = $.ui.dialog.overlay.create({options:{closeOnEscape:false}});
					if(!ele) this._overlay.css('cursor', 'wait'); 
				}
				else if(!show && this._overlay){
					this._overlay.fadeIn('slow');
					$.ui.dialog.overlay.destroy(this._overlay);
					this._overlay = null;
				}
				return this._overlay;
			},
            process: function () {
                var that = this;
                if (this.toCall.length > 0) {
                    this.invoke.apply(this, this.toCall.pop());
                    this.asyncCall(this.process, this, []);
                } else {
                    this._started = false;
                    this.overlay(false);
                }
            }
        },
        _context: {
            nodeType: function (value, name, parent, depth, rows) {
                parent = parent || null;
                depth = depth || 0;
                this.v = value || null;
                this.n = name || null;
                this.p = parent || null;
                this.d = parent != null ? parent.d + 1 : 0;
                this.t = rows || [];
            },
            isLeaf: function (value) {
                for (var i in value) {
                    return (i == 0 && !$.isArray(value[i]));
                }
            },
            root: null,
            toVisit: [],
            visitedAncestors: [],
            onFinish: function (that, root) { },
            onProcess: function (that, node, isLeaf) { },
            onFinishChildren: function (that, node) { },
            onStartChildren: function (that, node) { }
        },
        _processHeaders: function (context) {
            var that = this, toVisit = context.toVisit, visitedAncestors = context.visitedAncestors;
            if (toVisit.length == 0) {
                context.onFinish(that, context.root)
                return;
            }
            var node = toVisit[toVisit.length - 1];
            var isLeaf = context.isLeaf(node.v);
            if (!isLeaf) {
                if (visitedAncestors[visitedAncestors.length - 1] != node) {
                    visitedAncestors.push(node);
                    context.onStartChildren(that, node);
                    for (var i in node.v) {
                        toVisit.push(new context.nodeType(node.v[i], i, node));
                    }
                    that._asyncProcess.addFirst(that._processHeaders, that, [context]);
                    return;
                }
                context.onFinishChildren(that, visitedAncestors.pop());
            }
            context.onProcess(that, node, isLeaf);
            toVisit.pop();
            that._asyncProcess.addFirst(that._processHeaders, that, [context]);
        },
        _createColumnHeaders: function (ptable, columnHeaders, valueRow, valueFields, depth) {
            var that = this, settings = this.settings;
            var minColSpan = settings.valueFields.length || 1;
            var root = new that._context.nodeType(columnHeaders);
            var context = $.extend({}, that._context, {
                'root': root,
                'toVisit': [root],
                'valueRow': valueRow,
                'ptable': ptable,
                'valueFields': valueFields,
                'minColSpan': minColSpan,
                'onProcess': function (that, node, isLeaf) {
                    var context = this;
                    if (node.p == null) return;
                    var table = $(this.ptable), settings = that.settings, minColSpan = this.minColSpan, valueRow = this.valueRow, valueFields = this.valueFields;
                    if (isLeaf) {
                        node.t = minColSpan;
                        context.valueRow.append(context.valueFields.clone());
                    }
                    var tr = context.tr[node.p.d];
                    var th = $(that._tableHeader.clone()).text(node.n);
                    var ret = +node.t;
                    if (ret > 1) th.attr('colspan', ret);
                    tr.append(th);
                    if (node.p != null) node.p.t = +node.p.t + ret;
                },
                'onStartChildren': function (that, node) {
                    var context = this;
                    context.tr = context.tr || [];
                    if (!context.tr[node.d]) {
                        ptable.append(context.tr[node.d] = $('<tr>'));
                        if (settings.rowFields.length > 0)
                            context.tr[node.d].append($('<td>').attr('colspan', settings.rowFields.length));
                    }

                },
                'onFinishChildren': function (that, node) {
                    var context = this;
                    if ((that.settings.showRunningTotal || node.p == null)) {
                        context.tr[node.d].append($(that._tableHeader.clone()).text('Total').attr('rowspan', settings.columnFields.length - node.d).attr('colspan', context.minColSpan));
                        context.valueRow.append(context.valueFields.clone());
                        node.t = +node.t + minColSpan;
                    }
                }

            });
            that._asyncProcess.addLast(that._processHeaders, that, [context]);
        },
        _createTableRows: function (rowHeaders, columnHeaders, valueRow, ptable) {
            var that = this, settings = this.settings;
            var root = new that._context.nodeType(rowHeaders);
            that._asyncProcess.addLast(that._processHeaders, that, [$.extend({}, that._context, {
                'root': root,
                'toVisit': [root],
                'columnHeaders': columnHeaders,
                'valueRow': valueRow,
                'ptable': ptable,
                'onFinish': function (that, root) {
                    $(root.t).appendTo(this.ptable)
                    .hover(function () {
                        $(this).addClass('ui-state-highlight');
                    },
                    function () {
                        $(this).removeClass('ui-state-highlight');
                    });
                },
                'onProcess': function (that, node, isLeaf) {

                    if (isLeaf && node.p != null) {
                        var tr = $('<tr>');
                        this.ptable.append(tr);
                        that._addRowValueCells(node.v, tr, this.columnHeaders, 0);
                        node.tr = tr.get(0);
                        node.totRow = $(node.tr);
                        node.c = 1;
                    }
                    var tr = $(node.tr);
                    if (node.p != null) {
                        tr.prepend($(that._tableHeader.clone()).text(node.n).attr('rowspan', node.c));
                        node.p.tr = node.p.tr || node.tr;
                        node.p.c = (node.p.c || 0) + 1;
                        var colsPTot = node.p.totRow.find('td');
                        node.totRow.find('td').each(function (index) {
                            var col = $(colsPTot.get(index));
                            var t1 = col.text();
                            var t2 = $(this).text();
                            t1 = ((+t1 || 0) + (+t2 || 0));
                            col.text(t1);
                        });
                    }

                },
                'onStartChildren': function (that, node) {
                    //if (node.p == null || that.settings.showRunningTotal) {
                    node.totRow = $('<tr>').addClass("ui-pivot-total").append($(that._tableHeader.clone()).text('Total').attr('colspan', that.settings.rowFields.length - node.d));
                    var cols = this.valueRow.find('th').clone();
                    cols.text('0').appendTo(node.totRow).replaceWith('<td>');
                    node.c = (node.c || 0) + ((node.p == null || that.settings.showRunningTotal) ? 1 : 0);
                    //}


                },
                'onFinishChildren': function (that, node) {
                    var tr = $(node.tr);
                    if (node.p == null || that.settings.showRunningTotal) {
                        this.ptable.append(node.totRow);
                    }
                }
            })]);
        },
        _addRowValueCells: function (dataRowIndexes, uiTR, columnHeaders, depth) {
            var that = this, settings = this.settings;
            var curSum = [];
            var classes = [];
            //Initialize currSum and class
            for (var vf in settings.valueFields) {
                curSum[settings.valueFields[vf]] = 0;
                classes[settings.valueFields[vf]] = [];
            }
            //If we have reached the last level of columnHeaders we have row indexes in columnHeaders arg.
            if (depth == settings.columnFields.length) {
                //Process each row in columnHeaders and calculate sum
                for (var header in columnHeaders) {
                    if ($.inArray(columnHeaders[header], dataRowIndexes) >= 0) { //Process only rows that are common in row and column row indexes.
                        for (var index in curSum) {     //For each value field
                            var field = settings.fields[index];
                            var obj = {
                                total: curSum[index],
                                value: settings.jsonData[field.fieldName][columnHeaders[header]]
                            };
                            //Call summary method with supplied object.
                            curSum[index] = that._summaryTypes[field.summaryType](obj);
                            if (obj.value) {    //If this cell has value then add class from class fields.
                                for (var cf in settings.classFields) {
                                    var field = settings.fields[settings.classFields[cf]];
                                    var cls = settings.jsonData[field.fieldName][columnHeaders[header]].replace(/\W+/g, '');
                                    if ($.inArray(cls, classes[index]) < 0) classes[index].push(cls);
                                }
                            }
                        }

                    }
                }
                //Add value cell as we have sum and classes.
                for (var vf in settings.valueFields) {
                    var inx = settings.valueFields[vf];
                    $(uiTR).append($('<td>').text(curSum[inx] > 0 ? curSum[inx] : '').addClass(classes[inx].join(' ')));
                }

                return curSum;
            }
            //Process each column header recurssively and calculate running total.
            for (var header in columnHeaders) {
                var sum = that._addRowValueCells(dataRowIndexes, uiTR, columnHeaders[header], depth + 1);
                for (var index in curSum) {
                    curSum[index] += sum[index];
                }
            }
            //Show running total if set or if last column is processed
            if (that.settings.showRunningTotal || depth == 0) {
                for (var vf in settings.valueFields) {
                    var inx = settings.valueFields[vf];
                    $(uiTR).append($('<td>').addClass("ui-pivot-total").text(curSum[inx]));
                }
            }
            return curSum;
        },
        _createTable: function (rows) {
            var settings = this.settings, that = this;
            rows = rows || this._getAllRowIndex();

            var ptable = $('<table>');
            //Replace existing table with new one and set height equal to old one to stop scrolling.

            ptable.addClass('my-pivot-table');

            if (rows.length == 0) {
                return ptable.append($('<tr><td><strong>No Items Found!!</strong></td></tr>'));
            }
            //Set filtered Rows 
            this._filteredRows = rows;
            var tableItems = this._groupItems(rows);

            //Create value row
            var valueRow = $('<tr>');
            for (var i in settings.valueFields) {
                var field = settings.fields[settings.valueFields[i]];
                valueRow.append($(that._tableHeader.clone()).text(field.summaryName()));
            }
            //Value fields
            var valueFields = valueRow.find('th').clone();
            //Remove all fields from value row as these will be added when column headers are created unless there are no column headers
            if (settings.columnFields.length > 0) valueRow.find('th').remove();

            this._createColumnHeaders(ptable, tableItems.columnFields, valueRow, valueFields, 0);
			this._asyncProcess.addLast(function(){
				//We show value row only if value fields are more than one.
				if (settings.valueFields.length > 1) ptable.append(valueRow.prepend($('<td>').attr('colspan', settings.rowFields.length)));
			}, this, []);

            this._createTableRows(tableItems.rowFields, tableItems.columnFields, valueRow, ptable);

            this._asyncProcess.addLast(function (div, table) {
                div.append(table).find('.my-pivot-table').not(table).remove();
            }, this, [this._uiPivotContainer, ptable]);
            //return this._uiPivotContainer.append(ptable);

        },
        _sizeOfObject: function (object) {
            var count = 0;
            for (var i in object) {
                count++;
            }
            return count;
        },
        _destroy: function () {
            this._reset();
            this.element.show();
            this._super();
        }
    });
    //registerthewidgetwithinjqueryobject
    $.extend($.ali.pivot, { version: "1.1.0" });
    $.widget("ali.pivot", $.ali.pivot, {});
    /*
    $('#ContentPlaceHolder1_GridView1').pivot({
    rowFields: ['SuiteName', 'UserName'],
    columnFields: ['HardwareTypeName'],
    valueFields: ['NumberOfHours']
    });
    */


} (jQuery));