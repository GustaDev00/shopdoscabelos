import "./index.scss";
import URI, { parseQuery, buildQuery } from "urijs";
// import '../../assets/javascripts/infinityScroll'
import "../../assets/javascripts/smartResearch-mrcat";
import ScrollBack from "./components/scrollback";

export const Department = () => {
    var ClickOnProduct;


    // if (location.href.includes("liquidacao")) {
    //     if (!location.href.includes("bolsas-com-30-off")) {
    //         $(".filter-number").addClass("active");
    //     }
    // }

    if (location.href.includes("liquidacao/liqui-feminino")) {
        $(".filter.liqui2").addClass("active");
    }

    if (location.href.includes("liquidacao/liqui-masculino")) {
        $(".filter.liqui2").addClass("active");
    }

    if (location.href.includes("liquidacao")) {
        $(".filter.liqui2").addClass("active");
    }

    if (location.href.includes("/colecao-inverno")) {
        $(".filter.inverno22").addClass("active");
    }


    const blackFriday = () => {
        $(".filter-category-feminine").addClass("disabled");
        $(".filter-numbers-feminine").addClass("disabled");
        $(".filter-category-masculine").addClass("disabled");
        $(".filter-numbers-masculine").addClass("disabled");

        $(".category-drop-feminine").on("click", function () {
            $(".filter-blackfriday").addClass("clicked");
            $(".filter-category-feminine").removeClass("disabled");
            $(".filter-numbers-feminine").addClass("disabled");
            $(".filter-category-masculine").addClass("disabled");
            $(".filter-numbers-masculine").addClass("disabled");
        });
        $(".number-drop-feminine").on("click", function () {
            $(".filter-blackfriday").addClass("clicked");
            $(".filter-category-feminine").addClass("disabled");
            $(".filter-numbers-feminine").removeClass("disabled");
            $(".filter-category-masculine").addClass("disabled");
            $(".filter-numbers-masculine").addClass("disabled");
        });
        $(".category-drop-masculine").on("click", function () {
            $(".filter-blackfriday").addClass("clicked");
            $(".filter-category-feminine").addClass("disabled");
            $(".filter-numbers-feminine").addClass("disabled");
            $(".filter-category-masculine").removeClass("disabled");
            $(".filter-numbers-masculine").addClass("disabled");
        });
        $(".number-drop-masculine").on("click", function () {
            $(".filter-blackfriday").addClass("clicked");
            $(".filter-category-feminine").addClass("disabled");
            $(".filter-numbers-feminine").addClass("disabled");
            $(".filter-category-masculine").addClass("disabled");
            $(".filter-numbers-masculine").removeClass("disabled");
        });
    };

    const vtexSmartResearch = () => {
        $(function () {
            $(
                ".search-multiple-navigator input[type='checkbox']"
            ).vtexSmartResearch({
                loadContent: ".prateleira[id^=ResultItems]",
                shelfClass: ".prateleira",
                elemLoading:
                    '<div id="scrollLoading"><img src="/arquivos/loader-spinner.gif" /></div>',
                ajaxCallback: function () {
                    productsLine();
                },
                shelfCallback: function () {
                    productsLine();
                    document.dispatchEvent(
                        new CustomEvent("mrcat--on-change-shelf")
                    );
                },
                infiniteScrollCallback: function () {
                    document.dispatchEvent(
                        new CustomEvent("mrcat--on-change-shelf")
                    );
                },
            });
        });
    };

    const productsLine = () => {
        var $product_shelf = $(".x-product-list .prateleira > ul > li");

        $(".x-grid-selector__group").on("click", function () {
            $(this)
                .addClass("x-grid-selector__group--active")
                .siblings(".x-grid-selector__group")
                .removeClass("x-grid-selector__group--active");

            ClickOnProduct = true;

            if ($(this).data("grid") != 3) {
                $(".resultItemsWrapper").addClass("active");
            } else {
                $(".resultItemsWrapper").removeClass("active");
            }

            if ($(this).data("grid") === 4) {
                $product_shelf.addClass("shelfFour");
                $product_shelf.removeClass("shelfThree");
            } else {
                $product_shelf.addClass("shelfThree");
                $(".btn-quickshop").addClass("adjustHeight");
                $product_shelf.removeClass("shelfFour");
            }
        });

        if (!ClickOnProduct) {
            $(".x-grid-selector__group[data-grid='3']").addClass(
                "x-grid-selector__group--active"
            );
            $product_shelf.addClass("shelfThree");
            $(".btn-quickshop").addClass("adjustHeight");
            $product_shelf.removeClass("shelfFour");
        } else if (
            $(".x-grid-selector__group[data-grid='4']").hasClass(
                "x-grid-selector__group--active"
            )
        ) {
            $product_shelf.addClass("shelfFour");
            $product_shelf.removeClass("shelfThree");
        }
    };

    const orderBy = () => {
        $(".x-orderby ul li a").each(function () {
            var linkAtual = $(".orderBy select").eq(0);
            if (linkAtual.length) {
                linkAtual = linkAtual.attr("onchange").split("'")[1];
                var linkFinal = linkAtual + $(this).data("orderby");
                $(this).attr("href", linkFinal);
            }
        });

        // open orderby
        $(".x-orderby .x-titles-drop .x-title-drop").mouseover(function () {
            $(this).addClass("x-active");
            $(".x-orderby .x-drop").addClass("x-active");
        });

        // close orderby
        $(".x-orderby").mouseleave(function () {
            $(this).find(".x-title-drop").removeClass("x-active");
            $(".x-orderby .x-drop").removeClass("x-active");
        });
    };

    const selectDepartment = () => {
        var department = window.location.pathname
            .split("/")[1]
            .toLocaleLowerCase();

        $(".Category .first").each(function () {
            var atual = $(this).text();
            atual = atual.toLocaleLowerCase();
            if (atual == department) {
                $(this).addClass("active");
            }
        });
    };

    const dropFilters = () => {
        const $filters = $(".search-multiple-navigator .refino h5");
        $filters.addClass("active-most");
        $filters.on("click", function () {
            setTimeout(function () {
                if ($(".active-less").length > 0) {
                    $("#suiteshare_chat").hide();
                } else {
                    $("#suiteshare_chat").show();
                }
            }, 100);

            $(this).toggleClass("active-most active-less");
            $(this).closest(".refino").find("div").toggleClass("--active");
        });
        $(".x-filters-general").addClass("active");
    };

    const activeFilter = () => {
        setTimeout(function () {
            $(".filter-active").remove();

            if ($(".sr_selected").length > 0) {
                $(".sr_selected").each(function () {
                    var text = $(this).text();
                    var Class = $(this)
                        .attr("class")
                        .replace("[", "")
                        .replace("]", "");
                    $(
                        "<button name='button' class='filter-active " +
                        Class +
                        "'>" +
                        text +
                        "</button>"
                    ).appendTo(
                        ".search-multiple-navigator .area-filter-active"
                    );
                });
            }
            if ($(".filter-active").length > 0 && $(".clean").length == 0) {
                var urlInitial = $(".bread-crumb> ul .last a").attr("href");
                $(".search-multiple-navigator > h3").before(
                    "<a  class='cleanFilter' href=" +
                    urlInitial +
                    "><button class='clean'> LIMPAR TODOS OS FILTROS</button></a>"
                );
            }
            if ($(".filter-active").length == 0) {
                $(".clean").remove();
            }
        }, 100);
    };

    const filterActives = () => {
        $(".search-multiple-navigator .refino > div label").on(
            "click",
            function () {
                activeFilter();
            }
        );

        $(document).ajaxStop(function () {
            $(".filter-active").on("click", function () {
                var especification = $(this).attr("class").split(" ");
                $(
                    ".search-multiple-navigator .refino > div ." +
                    especification[1] +
                    " input"
                ).trigger("click");
                $(this).remove();
            });
        });

        $(".filtro_faixa-de-preco > div label").each(function () {
            var teste = $(this)
                .attr("class")
                .replace("[", "")
                .replace("]", "")
                .split(" ");
            $(this).addClass(teste[0]);
        });
    };

    // SCRIPT SEO
    const showTextSEO = () => {
        if (!$(".x-subcategory-seo")[0]) {
            $(".x-category-father-text").show();
        }
    };

    const toggleSeo = () => {
        $(".x-content__seo--open").click(function () {
            $(".x-content__seo--text").toggleClass("active");
            if ($(".x-content__seo--text").hasClass("active")) {
                $(".x-content__seo--open").text("ver menos");
            } else {
                $(".x-content__seo--open").text("ver mais");
            }
        });
    };

    const totalNumberProducts = () => {
        let numberOfProducts = $(
            ".searchResultsTime .resultado-busca-numero .value"
        )[0].innerHTML;
        $(".x-total-product__number").html(`( ${numberOfProducts} )`);
    };

    const newOrderBy = () => {

        $(".x-orderby .x-drop li a").on("click", function (e) {
            e.preventDefault();
            var value = $(this).data("value"),
                url = new URI(window.location.href),
                pathname = url.pathname(),
                query = url.query() != "" ? parseQuery(url.query()) : "";

            if (query != "") {
                query.O = value;
                query = buildQuery(query);

                window.location.href = pathname + "?" + query;
            } else {
                window.location.href = pathname + "?O=" + value;
            }
        });
    }


    $(document).ready(function () {
        blackFriday();
        productsLine();
        orderBy();
        selectDepartment();
        dropFilters();
        showTextSEO();
        toggleSeo();
        ScrollBack();
        filterActives();
        activeFilter();
        vtexSmartResearch();
        totalNumberProducts();

        $(".search-multiple-navigator > h3").after(
            "<div class='area-filter-active'></div>"
        );

        $("#returnToTop").hide();
        newOrderBy();
    });

    $(document).ajaxStop(function () {
        productsLine();

        if ($(".area-filter-active").children().length > 0) {
            $(".filter-number").removeClass("active");
        } else if (location.href.includes("liquidacao")) {
            if (!location.href.includes("bolsas-com-30-off")) {
                $(".filter-number").addClass("active");
            }
        }
    });
};
