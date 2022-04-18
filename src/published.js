"use strict";

const SERVER_URL = "http://ugdev.cs.smu.ca:3033";
const UPDATE_INTERVAL = 10000;

setInterval(() => displayPublishedBlog(id), UPDATE_INTERVAL);

function displayPublishedBlog(id) {
    $.get(SERVER_URL + "/getBlog", { blogIndex: id }).done((res) => {
        let blog = res;
        let unpublishedMsg = "Sorry. This blog is currently not available.";
        let publishedMsg = blog.blog_content;

        $("#blog_URL_content").html(
            blog.blog_status === "P" ? publishedMsg : unpublishedMsg
        );
    }).fail(() => {
        $("#blog_URL_content").html("Server Not Available...\n Try Agian Later! ");
    });
}

displayPublishedBlog(id);