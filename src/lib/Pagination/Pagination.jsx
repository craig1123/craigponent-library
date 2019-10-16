import React, { PureComponent, Fragment } from 'react';
import { bool, func, number, string } from 'prop-types';
import { getLastChunkPage, getFirstChunkPage } from './pagination.viewStates';
import PaginationItem from './PaginationItem';
import PaginationLink from './PaginationLink';

import styles from './pagination.module.scss';

class Pagination extends PureComponent {
  setActivePage = page => () => {
    if (page !== this.props.activePage) {
      this.props.setActivePage(page);
    }
  };

  renderPages = () => {
    const { activePage, totalPages, chunkSize, disabled } = this.props;
    const pages = [
      // first page
      <PaginationItem
        active={activePage === 1}
        key="first-page"
        disabled={disabled}
      >
        <PaginationLink onClick={this.setActivePage(1)} disabled={disabled}>
          1
        </PaginationLink>
      </PaginationItem>,
    ];

    if (totalPages <= chunkSize + 2) {
      for (let page = 1; page <= totalPages; page += 1) {
        if (page === 1) continue; // eslint-disable-line
        pages.push(
          <PaginationItem
            active={activePage === page}
            key={page}
            disabled={disabled}
          >
            <PaginationLink
              onClick={this.setActivePage(page)}
              disabled={disabled}
            >
              {page}
            </PaginationLink>
          </PaginationItem>,
        );
      }

      return pages;
    }
    const pagesLeft = totalPages - activePage;
    const firstChunkPage = getFirstChunkPage(pagesLeft, this.props);
    const lastChunkPage = getLastChunkPage(pagesLeft, this.props);

    pages.push(
      // ellipsis
      <PaginationItem
        active={activePage === 2}
        key="prev-chunk"
        disabled={disabled}
      >
        <PaginationLink
          disabled={disabled}
          onClick={() =>
            activePage < chunkSize + 1
              ? this.setActivePage(2)()
              : this.setActivePage(firstChunkPage - 1)()
          }
        >
          {activePage < chunkSize + 1 ? 2 : '...'}
        </PaginationLink>
      </PaginationItem>,
    );

    for (let page = firstChunkPage; page <= lastChunkPage; page += 1) {
      if (page === 1 || page === 2) continue; // eslint-disable-line
      pages.push(
        <PaginationItem
          active={activePage === page}
          key={page}
          disabled={disabled}
        >
          <PaginationLink
            onClick={this.setActivePage(page)}
            disabled={disabled}
          >
            {page}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    if (pagesLeft > chunkSize) {
      // show ... or second to last, and last page
      const secondToLastPage = totalPages - 1;
      const showEllipsis = lastChunkPage + 1 < secondToLastPage;
      pages.push(
        <PaginationItem
          onClick={() =>
            showEllipsis
              ? this.setActivePage(lastChunkPage + 1)()
              : this.setActivePage(secondToLastPage)()
          }
          disabled={disabled}
          key="ellipsis-page"
        >
          <PaginationLink disabled={disabled}>
            {showEllipsis ? '...' : secondToLastPage}
          </PaginationLink>
        </PaginationItem>,
      );

      pages.push(
        // last page
        <PaginationItem
          active={activePage === totalPages}
          key="last-page"
          disabled={disabled}
        >
          <PaginationLink
            onClick={this.setActivePage(totalPages)}
            disabled={disabled}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    return pages;
  };

  renderMobilePages = () => {
    const { activePage, chunkSize, totalPages, disabled } = this.props;
    const pages = [];
    const pagesLeft = totalPages - activePage;
    let firstChunkPage = getFirstChunkPage(pagesLeft, this.props);
    let lastChunkPage = getLastChunkPage(pagesLeft, this.props);
    if (totalPages <= chunkSize + 2) {
      firstChunkPage = 1;
      lastChunkPage = totalPages;
    }

    for (let page = firstChunkPage; page <= lastChunkPage; page += 1) {
      pages.push(
        <PaginationItem
          active={activePage === page}
          key={page}
          disabled={disabled}
        >
          <PaginationLink
            onClick={this.setActivePage(page)}
            disabled={disabled}
          >
            {page}
          </PaginationLink>
        </PaginationItem>,
      );
    }
    return pages;
  };

  renderPrevCaret = () => (
    <PaginationItem
      disabled={this.props.activePage === 1 || this.props.disabled}
      className={styles['pagination-prev']}
    >
      <PaginationLink
        previous
        className={this.props.arrowsOnly ? styles['arrows-only'] : ''}
        disabled={this.props.activePage === 1 || this.props.disabled}
        onClick={this.setActivePage(this.props.activePage - 1)}
      />
    </PaginationItem>
  );

  renderNextCaret = () => (
    <PaginationItem
      disabled={
        this.props.activePage === this.props.totalPages || this.props.disabled
      }
      className={styles['pagination-next']}
    >
      <PaginationLink
        next
        className={this.props.arrowsOnly ? styles['arrows-only'] : ''}
        disabled={
          this.props.activePage === this.props.totalPages || this.props.disabled
        }
        onClick={this.setActivePage(this.props.activePage + 1)}
      />
    </PaginationItem>
  );

  render() {
    const {
      activePage,
      arrowsOnly,
      className,
      chunkSize,
      isMobile,
      listClassName,
      pageSize,
      setActivePage,
      showForOnePage,
      styleMode,
      totalElements,
      totalPages,
      ...rest
    } = this.props;

    const darkMode = styleMode === 'dark' ? styles.dark : '';

    if (totalPages < 2 && !showForOnePage) {
      return null;
    }

    let result = (
      <ul className={`${styles.pagination} ${listClassName}`}>
        {this.renderPrevCaret()}
        {/* All the in between pages */}
        {isMobile || chunkSize * 2 >= totalPages
          ? this.renderMobilePages()
          : this.renderPages()}
        {/* Next Caret */}
        {this.renderNextCaret()}
      </ul>
    );

    if (arrowsOnly) {
      const pageEnd = activePage * pageSize;
      const pageRange = pageEnd > totalElements ? totalElements : pageEnd;
      const pageBeginning = pageEnd - pageSize + 1;
      result = (
        <Fragment>
          <div className={styles['page-quantity']}>
            {pageBeginning}-{pageRange} of {totalElements}
          </div>
          <ul
            className={`${styles.pagination} ${listClassName} ${
              styles['arrows-only-ul']
            }`}
          >
            {this.renderPrevCaret()}
            {this.renderNextCaret()}
          </ul>
        </Fragment>
      );
    }

    return (
      <nav
        className={`${
          styles['pagination-wrapper']
        } ${darkMode} ${className}`.trim()}
        aria-label="pagination"
        {...rest}
      >
        {result}
      </nav>
    );
  }
}

function handleCustomPropType(props, propName) { // eslint-disable-line
  if (
    props.arrowsOnly &&
    (props[propName] === undefined || typeof props[propName] !== 'number')
  ) {
    return new Error(
      `

${propName} is required when "arrowsOnly" prop is true.
It is expected to be a number

`,
    );
  }
}

Pagination.propTypes = {
  activePage: number.isRequired,
  setActivePage: func.isRequired,
  totalPages: number.isRequired,
  arrowsOnly: bool,
  /** How many number boxes we should show */
  chunkSize: number,
  className: string,
  disabled: bool,
  isMobile: bool,
  listClassName: string,
  pageSize: props => handleCustomPropType(props, 'pageSize'),
  showForOnePage: bool,
  styleMode: string,
  totalElements: props => handleCustomPropType(props, 'totalElements'),
};

Pagination.defaultProps = {
  arrowsOnly: false,
  chunkSize: 5,
  className: '',
  isMobile: false,
  listClassName: '',
  pageSize: null,
  showForOnePage: false,
  styleMode: 'light',
  totalElements: null,
  disabled: false,
};

export default Pagination;
