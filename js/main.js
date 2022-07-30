var index = 0;
const ITEMS_ON_PAGE = 6;
var items;

function showMore() {
    let customContainer = document.getElementById("customContainer");
    let nextIndex = index + ITEMS_ON_PAGE;
    for (let i = index; i < nextIndex && i < items.length; i++) {
        addItem(customContainer, items[i]);
    }
    index = nextIndex;
}

function loadJson() {
    fetch("data/metadata.json")
        .then(response => {
            response.json().then(function (value) {
                items = value;
                showMore();
            });
        })
}

function getNavigationButtons(item) {
    if (item.child.length > 1) {
        let toolbar = createTag('div', 'btn-toolbar justify-content-between');
        toolbar.appendChild(createTag('button', 'btn btn-primary bi-arrow-left-square btnPrev disabled', '&nbsp;Prev'))
        toolbar.appendChild(createTag('button', 'btn btn-primary bi-arrow-right-square btnNext', '&nbsp;Next'))
        return toolbar;
    } else {
        return undefined;
    }
}

function createTag(tagName, clazz, text) {
    let buttonElement = document.createElement(tagName);
    if (clazz !== undefined) {
        buttonElement.className = clazz;
    }
    if (text !== undefined) {
        buttonElement.innerHTML = text;
    }
    return buttonElement;
}

function getMapLink(item) {
    if (item.location !== undefined) {
        let aTag = createTag('a', 'bi-pin-map-fill', '&nbsp;' + item.location.name);
        aTag.setAttribute('target', '_blank');
        aTag.setAttribute('href', 'http://maps.google.com/maps?q=loc:' + item.location.lat + ',' + item.location.lng + ' (' + item.location.name + ')');
        return aTag
    }
    return undefined;
}

function addItem(customContainer, item) {
    item.position = 0;
    let colDiv = createTag('div', 'col p-1 border border-dark rounded');
    let cardDiv = createTag('div', 'card shadow-sm');
    colDiv.appendChild(cardDiv);

    let mediaDiv = getMediaSrc(item);
    cardDiv.appendChild(mediaDiv);

    let cardBodyDiv = createTag('div', 'card-body');
    let navigationButtons = getNavigationButtons(item);
    if (navigationButtons !== undefined) {
        cardBodyDiv.appendChild(navigationButtons);
    }
    cardBodyDiv.appendChild(createTag('p', 'card-text', item.description));
    let nextDiv = createTag('div', 'd-flex justify-content-between align-items-center');
    let mapLink = getMapLink(item);
    if (mapLink !== undefined) {
        nextDiv.appendChild(mapLink);
    }
    nextDiv.appendChild(createTag('small', 'text-muted', item.date.substr(0, 10)));
    cardBodyDiv.appendChild(nextDiv);
    colDiv.appendChild(cardBodyDiv);

    let btnNext = colDiv.getElementsByClassName('btnNext');
    if (btnNext !== undefined && btnNext.length > 0) {
        btnNext[0].onclick = function () {
            item.position++;
            disableButtons(item, btnNext[0]);
            if (item.position >= item.child.length) {
                item.position = item.child.length - 1;
            }

            cardDiv.removeChild(cardDiv.getElementsByClassName('mediaCard')[0]);
            cardDiv.appendChild(getMediaSrc(item));
        }
    }
    let btnPrev = colDiv.getElementsByClassName('btnPrev');

    if (btnPrev !== undefined && btnPrev.length > 0) {
        btnPrev[0].onclick = function () {
            item.position--;
            disableButtons(item, btnPrev[0]);
            if (item.position < 0) {
                item.position = 0;
            }

            cardDiv.removeChild(cardDiv.getElementsByClassName('mediaCard')[0]);
            cardDiv.appendChild(getMediaSrc(item));
        }
    }
    customContainer.appendChild(colDiv);
}

function disableButtons(item, control) {
    let parent = control.parentNode;

    let btnNext = parent.getElementsByClassName('btnNext')[0];
    let btnPrev = parent.getElementsByClassName('btnPrev')[0];

    btnNext.classList.remove('disabled');
    btnPrev.classList.remove('disabled');

    btnNext.disabled = item.position >= item.child.length - 1;
    btnPrev.disabled = item.position <= 0;
}

function createImage(child) {
    let media = createTag('img', 'bd-placeholder-img card-img-top');
    media.src = child.fileName;
    media.setAttribute('alt', 'Lights');
    return media;
}

function createVideo(child) {
    let media = createTag('video', 'bd-placeholder-img card-img-top');
    const src = createTag('source');
    src.src = child.fileName;
    media.appendChild(src);
    media.setAttribute('alt', 'Lights');
    return media;
}

function getMediaSrc(item) {
    let media;
    let divElement = createTag('div', 'mediaCard mx-auto');
    let child = item.child[item.position];
    if (child.type === 'IMAGE') {
        media = createImage(child);
        divElement.appendChild(media);
    } else {
        let image;
        if (child.image !== undefined) {
            image = createImage(child.image);
            divElement.appendChild(image);
        }
        media = createVideo(child);
        media.classList.add('d-none');
        divElement.appendChild(media);

        let divToolbar = createTag('div', 'btn-toolbar');
        let buttonPlay = createTag('button', 'btn btn-danger bi-play-btn-fill btn-block btnPlay', '&nbsp;Play');
        divToolbar.appendChild(buttonPlay);
        media.onclick = function () {
            if (image !== undefined) {
                image.classList.add('d-none');
            }
            media.classList.remove('d-none');
            this.play();
        }
        buttonPlay.onclick = function () {
            if (image !== undefined) {
                image.classList.add('d-none');
            }
            media.classList.remove('d-none');
            media.play();
        }
        divElement.appendChild(divToolbar);
    }

    return divElement;
}

loadJson();
