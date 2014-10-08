$(function () {
    var imageCover;
    var docTitle;
    Dropzone.options.coverImage = {
        paramName: "file",
        maxFilesize: 2,
        addRemoveLinks: true,
        previewsContainer: null,
        init: function () {
            this.on('complete', function (file) {
                imageCover = file.name;
            });
        }
    };

    $('#createTitle').redactor({
        lang: 'pt_br',
        toolbar: false,
        minHeight: 97,
        autosave: '/novoTitulo/' + thisArticle,
        autosaveInterval: 5,
        autosaveCallback: function (name, json) {
            docTitle = json;
        }
    });
    $('#createContent').redactor({
        lang: 'pt_br',
        plugins: ['fontcolor', 'fontsize', 'fontfamily'],
        placeholder: 'Texto sensacional',
        minHeight: 300,
        imageUpload: '/artigoImage',
        convertImageLinks: true,
        convertVideoLinks: true,
        imageUploadCallback: function (image, json) {

        },
        autosave: '/novoArtigo/' + thisArticle,
        autosaveInterval: 5,
        autosaveCallback: function (json) {

        }
    });

    $('.form-artigo').on('submit', function (e) {
        e.preventDefault();
        var thisone = $(this);
        $('input[name=cover]').attr('value', imageCover);
        $('input[name=title]').attr('value', docTitle);

        editCheck = $('#editCheck').html();
        var editChecked;
        if (editCheck == 'check') {
            editChecked = true;
        } else {
            editChecked = false;
        }

        $.ajax({
            url: '/titleCheck/' + thisArticle,
            type: "get",
            data: { title: docTitle, check: editChecked }
        }).done(function (data) {
            if (data == 'yes') {
                $.ajax({
                    url: "/novoArtigo",
                    data: thisone.serialize(),
                    type: "POST"
                }).done(function (url) {
                    window.location.replace("http://localhost:3000" + url);
                });
            } else {
                $('#slugErr').slideDown().delay(2000).slideUp();
            }
        });
    });



});