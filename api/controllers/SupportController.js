var Machine = require("machine");
module.exports = {
    'aboutirc': function(req, res) {
        Machine.build({
            inputs: {},
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                // Resolve path
                sails.machines['2806adc7-0289-473a-8843-020526771565_1.1.0'].resolve({
                    "paths": ["views/partials/doc-menus/support/irc.jsmenu"]
                }).exec({
                    "error": function(resolvePath) {
                        return exits.error({
                            data: resolvePath,
                            status: 500
                        });

                    },
                    "success": function(resolvePath) {
                        // Read JSON file
                        sails.machines['8f8944e3-49b6-429d-a4c5-c77fe3ae878d_3.0.0'].readJson({
                            "source": resolvePath,
                            "schema": [{
                                templateTitle: "Foo-Bar.ejs",
                                fullPathAndFileName: "idk/Foo-Bar.ejs",
                                data: {}
                            }]
                        }).exec({
                            "error": function(readJSONFile) {
                                return exits.error({
                                    data: readJSONFile,
                                    status: 500
                                });

                            },
                            "doesNotExist": function(readJSONFile) {
                                return exits.error({
                                    data: readJSONFile,
                                    status: 500
                                });

                            },
                            "couldNotParse": function(readJSONFile) {
                                return exits.error({
                                    data: readJSONFile,
                                    status: 500
                                });

                            },
                            "success": function(readJSONFile) {
                                // Marshal menu metadata
                                sails.machines['_project_3549_0.0.24'].MarshaldocPageMetadata({
                                    "docPageMetadatas": readJSONFile
                                }).exec({
                                    "error": function(marshalMenuMetadata) {
                                        return exits.error({
                                            data: marshalMenuMetadata,
                                            status: 500
                                        });

                                    },
                                    "success": function(marshalMenuMetadata) {
                                        return exits.respond({
                                            data: {
                                                sections: marshalMenuMetadata,
                                                title: "About IRC | Sails.js Support"
                                            },
                                            action: "display_view",
                                            status: 200,
                                            view: "about-irc"
                                        });

                                    }
                                });

                            }
                        });

                    }
                });
            }
        }).configure(req.params.all(), {
            respond: res.response,
            error: res.negotiate
        }).exec();
    },
    'find': function(req, res) {
        Machine.build({
            inputs: {},
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                // Resolve path
                sails.machines['2806adc7-0289-473a-8843-020526771565_1.1.0'].resolve({
                    "paths": ["views/partials/doc-menus/version-notes.jsmenu"]
                }).exec({
                    "error": function(resolvePath) {
                        return exits.error({
                            data: resolvePath,
                            status: 500
                        });

                    },
                    "success": function(resolvePath) {
                        // Load the dynamic jsmenu file
                        sails.machines['8f8944e3-49b6-429d-a4c5-c77fe3ae878d_3.0.0'].readJson({
                            "source": resolvePath,
                            "schema": [{
                                templateTitle: "Foo-bar.ejs",
                                fullPathAndFileName: "idk/Foo-Bar.ejs",
                                data: {},
                                children: ["idk/Foo-Bar/whatevs.ejs"],
                                isChild: true,
                                isParent: true,
                                parent: "idk"
                            }]
                        }).exec({
                            "error": function(loadTheDynamicJsmenuFile) {
                                return exits.error({
                                    data: loadTheDynamicJsmenuFile,
                                    status: 500
                                });

                            },
                            "doesNotExist": function(loadTheDynamicJsmenuFile) {
                                return exits.error({
                                    data: loadTheDynamicJsmenuFile,
                                    status: 500
                                });

                            },
                            "couldNotParse": function(loadTheDynamicJsmenuFile) {
                                return exits.error({
                                    data: loadTheDynamicJsmenuFile,
                                    status: 500
                                });

                            },
                            "success": function(loadTheDynamicJsmenuFile) {
                                // Marshal menu metadata
                                sails.machines['_project_3549_0.0.24'].MarshaldocPageMetadata({
                                    "docPageMetadatas": loadTheDynamicJsmenuFile
                                }).exec({
                                    "error": function(marshalMenuMetadata) {
                                        return exits.error({
                                            data: marshalMenuMetadata,
                                            status: 500
                                        });

                                    },
                                    "success": function(marshalMenuMetadata) {
                                        // Reverse sort menu items by semver
                                        sails.machines['_project_3549_0.0.24'].Reversesortbysemver({
                                            "array": marshalMenuMetadata
                                        }).exec({
                                            "error": function(reverseSortMenuItemsBySemver) {
                                                return exits.error({
                                                    data: reverseSortMenuItemsBySemver,
                                                    status: 500
                                                });

                                            },
                                            "success": function(reverseSortMenuItemsBySemver) {
                                                return exits.respond({
                                                    data: {
                                                        menuItems: reverseSortMenuItemsBySemver,
                                                        title: "Support | Sails.js"
                                                    },
                                                    action: "display_view",
                                                    status: 200,
                                                    view: "support"
                                                });

                                            }
                                        });

                                    }
                                });

                            }
                        });

                    }
                });
            }
        }).configure(req.params.all(), {
            respond: res.response,
            error: res.negotiate
        }).exec();
    }
};