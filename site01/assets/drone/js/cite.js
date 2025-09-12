var currentCitationData = {};

$(document).ready(function() {
    $('.bibtex').click(function(e) {
        e.preventDefault();
        
        var $trigger = $(this);
        currentCitationData = {
            title: $trigger.attr('cite-title'),
            cite: $trigger.attr('cite-data'),
        };
        
        // Update the hidden modal content
        $('#modal-content').html(generateModalContent());
        
        // Open fancybox with the updated content
        $.fancybox.open('#citation-modal', {
            type: 'inline',
            width: 600,
            height: 'auto',
            autoSize: false,
            padding: 20
        });
    });
});

function generateModalContent() {
    let content = '<div>';
    
    if (currentCitationData.title) {
        content += '<h3>' + escapeHtml(currentCitationData.title) + '</h3>';
    }
    
    content += '<pre>' + escapeHtml(currentCitationData.cite) + '</pre>';
    content += '<div>';
    content += '<button onclick="copyCitation()">Copy</button>';
    content += '</div>';
    content += '</div>';
    
    return content;
}

function copyCitation() {
    var citationText = currentCitationData.cite;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(citationText).then(function() {
            $.fancybox.close();
        });
    }
}

function escapeHtml(text) {
    if (!text) return '';
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}