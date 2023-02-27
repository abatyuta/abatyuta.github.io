let index = 0;
const ITEMS_ON_PAGE = 6;
let items;

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
                let id = jQuery.url.param('id');
                if(id !== undefined) {
                    items = value.filter(function (item){
                        return item.id === id;
                    });

                }
                if(items === undefined || items.length === 0 ) {
                    items = value;
                }
                showMore();
            });
        })
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
    let colDiv = createTag('div', 'col p-1 border border-dark rounded');
    let cardDiv = createTag('div', 'card shadow-sm');
    colDiv.appendChild(cardDiv);

    let mediaDiv = getMediaSrc(item);
    cardDiv.appendChild(mediaDiv);

    let cardBodyDiv = createTag('div', 'card-body');

    cardBodyDiv.appendChild(createTag('p', 'card-text', item.description));
    let nextDiv = createTag('div', 'd-flex justify-content-between align-items-center');
    let mapLink = getMapLink(item);
    if (mapLink !== undefined) {
        nextDiv.appendChild(mapLink);
    }
    nextDiv.appendChild(createTag('small', 'text-muted', item.date.substr(0, 10)));
    cardBodyDiv.appendChild(nextDiv);
    colDiv.appendChild(cardBodyDiv);

    customContainer.appendChild(colDiv);
}

function createImage(child) {
    let media = createTag('img', 'bd-placeholder-img card-img-top d-block w-100');
    media.src = child.fileName;
    media.setAttribute('alt', 'Lights');
    return media;
}

function createVideo(child) {
    let media = createTag('video', 'bd-placeholder-img card-img-top d-block w-100');
    const src = createTag('source');
    src.src = child.fileName;
    media.appendChild(src);
    media.setAttribute('alt', 'Lights');
    return media;
}

let id = 1;
const mdbTarget = '-bs';

function getMediaSrc(item) {
    let divMediaCard = createTag('div', 'mediaCard mx-auto');
    let divCarousel = createTag('div', 'carousel slide');
    divCarousel.id = 'carousel-' + id;
    // divCarousel.setAttribute('data'+mdbTarget+'-ride', 'carousel');
    divMediaCard.appendChild(divCarousel)

    let divCarouselIndicators = createTag('div', 'indicators');
    // divCarousel.appendChild(divCarouselIndicators);
    for (let i = 0; i < item.child.length; i++) {
        let indicatorBtn = createTag('button');
        indicatorBtn.setAttribute('type', 'button');
        indicatorBtn.setAttribute('data' + mdbTarget + '-target', divCarousel.id);
        indicatorBtn.setAttribute('aria-label', 'Slide' + (i + 1));
        indicatorBtn.setAttribute('data' + mdbTarget + '-slide-to', '' + i);
        if (i === 0) {
            indicatorBtn.classList.add('active');
            indicatorBtn.setAttribute('aria-current', 'true');
        }
        divCarouselIndicators.appendChild(indicatorBtn);
    }

    let divCarouselInner = createTag('div', 'carousel-inner');
    divCarousel.appendChild(divCarouselInner)
    let b = true;
    item.child.forEach(child => {
        let media;
        let divCarouselItem = createTag('div', 'carousel-item');
        if (b) {
            b = false;
            divCarouselItem.classList.add('active');
        }
        divCarouselInner.appendChild(divCarouselItem);
        if (child.type === 'IMAGE') {
            media = createImage(child);
            divCarouselItem.appendChild(media);
        } else {
            let image;
            if (child.image !== undefined) {
                image = createImage(child.image);
                divCarouselItem.appendChild(image);
            }
            media = createVideo(child);
            media.classList.add('d-none');
            divCarouselItem.appendChild(media);

            let buttonPlay = createTag('button', 'btnPlay align-items-end',
                '<span class="bi-play-circle-fill btnPlay-icon img-thumbnail bg-prymary btn-carousel m-2" aria-hidden="false"></span>\n' +
                '<span class="visually-hidden">&nbsp;Play</span>');
            media.onclick = function () {
                play(image, media);
            }
            media.addEventListener('ended', () => {
                ended(image, media);
            }, false);
            buttonPlay.onclick = function () {
                play(image, media);
            }
            media.addEventListener('onfocus', () => ended(image, media));
            divCarouselItem.appendChild(buttonPlay);
        }
    });
    if (item.child.length > 1) {
        <!-- Controls -->
        let btnCarouselPrev = createBtnCarousel('prev', divCarousel.id);
        divCarousel.appendChild(btnCarouselPrev);
        let btnCarouselNext = createBtnCarousel('next', divCarousel.id);
        divCarousel.appendChild(btnCarouselNext);
    }
    id++;
    return divMediaCard;
}

function play(image, media) {
    if (image !== undefined) {
        image.classList.add('d-none');
    }
    media.classList.remove('d-none');
    if (media.paused) {
        media.play();
    } else {
        media.pause();
    }
}


function ended(image, media) {
    if (image !== undefined) {
        image.classList.remove('d-none');
    }
    media.classList.add('d-none');
}

function createBtnCarousel(type, divCarouselId) {
    let btnCarousel = createTag('button', 'carousel-control-' + type + ' align-items-end',
        '<span class="bi-caret-' + (type === 'prev' ? 'left' : 'right') + '-square-fill img-thumbnail bg-prymary btn-carousel m-2" aria-hidden="true"></span>\n' +
        '<span class="visually-hidden btn-carousel">' + type + '</span>'
    );
    btnCarousel.setAttribute('data' + mdbTarget + '-target', '#' + divCarouselId);
    btnCarousel.setAttribute('data' + mdbTarget + '-slide', type);

    return btnCarousel;
}

loadJson();
onStartUp();