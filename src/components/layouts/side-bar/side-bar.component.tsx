import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { commonLayoutModeStateAtom } from "../common-layout/common-layout.atom";
import styles from "./side-bar.component.module.scss";
import { ISideBar } from "./side-bar.interface";

const SideBar = (props: ISideBar.Props) => {
  const sideBarElementRef = useRef<HTMLDivElement>(null);
  const [commonLayoutModeState, setCommonLayoutModeState] = useRecoilState(commonLayoutModeStateAtom);
  const [isActiveTransition, setIsActiveTransition] = useState(false);

  const router = useRouter();
  const [menuItems, setMenuItems] = useState<ISideBar.MenuItem[]>([
    { menuName: 'd3-001-adder', menuLink: '/d3-example/d3-001-adder' },
    { menuName: 'd3-002-delaunay', menuLink: '/d3-example/d3-002-delaunay' },
    { menuName: 'd3-003-format-specifier', menuLink: '/d3-example/d3-003-format-specifier' },
    { menuName: 'd3-004-intern-map', menuLink: '/d3-example/d3-004-intern-map' },
    { menuName: 'd3-005-intern-set', menuLink: '/d3-example/d3-005-intern-set' },
    { menuName: 'd3-006-voronoi', menuLink: '/d3-example/d3-006-voronoi' },
    { menuName: 'd3-007-zoom-transform', menuLink: '/d3-example/d3-007-zoom-transform' },
    { menuName: 'd3-008-active', menuLink: '/d3-example/d3-008-active' },
    { menuName: 'd3-009-arc', menuLink: '/d3-example/d3-009-arc' },
    { menuName: 'd3-010-area', menuLink: '/d3-example/d3-010-area' },
    { menuName: 'd3-011-areaRadial', menuLink: '/d3-example/d3-011-areaRadial' },
    { menuName: 'd3-012-ascending', menuLink: '/d3-example/d3-012-ascending' },
    { menuName: 'd3-013-autoType', menuLink: '/d3-example/d3-013-autoType' },
    { menuName: 'd3-014-axisBottom', menuLink: '/d3-example/d3-014-axisBottom' },
    { menuName: 'd3-015-axisLeft', menuLink: '/d3-example/d3-015-axisLeft' },
    { menuName: 'd3-016-axisRight', menuLink: '/d3-example/d3-016-axisRight' },
    { menuName: 'd3-017-axisTop', menuLink: '/d3-example/d3-017-axisTop' },
    { menuName: 'd3-018-bin', menuLink: '/d3-example/d3-018-bin' },
    { menuName: 'd3-019-bisect', menuLink: '/d3-example/d3-019-bisect' },
    { menuName: 'd3-020-bisectCenter', menuLink: '/d3-example/d3-020-bisectCenter' },
    { menuName: 'd3-021-bisectLeft', menuLink: '/d3-example/d3-021-bisectLeft' },
    { menuName: 'd3-022-bisectRight', menuLink: '/d3-example/d3-022-bisectRight' },
    { menuName: 'd3-023-bisector', menuLink: '/d3-example/d3-023-bisector' },
    { menuName: 'd3-024-blob', menuLink: '/d3-example/d3-024-blob' },
    { menuName: 'd3-025-brush', menuLink: '/d3-example/d3-025-brush' },
    { menuName: 'd3-026-brushSelection', menuLink: '/d3-example/d3-026-brushSelection' },
    { menuName: 'd3-027-brushX', menuLink: '/d3-example/d3-027-brushX' },
    { menuName: 'd3-028-brushY', menuLink: '/d3-example/d3-028-brushY' },
    { menuName: 'd3-029-buffer', menuLink: '/d3-example/d3-029-buffer' },
    { menuName: 'd3-030-chord', menuLink: '/d3-example/d3-030-chord' },
    { menuName: 'd3-031-chordDirected', menuLink: '/d3-example/d3-031-chordDirected' },
    { menuName: 'd3-032-chordTranspose', menuLink: '/d3-example/d3-032-chordTranspose' },
    { menuName: 'd3-033-cluster', menuLink: '/d3-example/d3-033-cluster' },
    { menuName: 'd3-034-color', menuLink: '/d3-example/d3-034-color' },
    { menuName: 'd3-035-contourDensity', menuLink: '/d3-example/d3-035-contourDensity' },
    { menuName: 'd3-036-contours', menuLink: '/d3-example/d3-036-contours' },
    { menuName: 'd3-037-count', menuLink: '/d3-example/d3-037-count' },
    { menuName: 'd3-038-create', menuLink: '/d3-example/d3-038-create' },
    { menuName: 'd3-039-creator', menuLink: '/d3-example/d3-039-creator' },
    { menuName: 'd3-040-cross', menuLink: '/d3-example/d3-040-cross' },
    { menuName: 'd3-041-csv', menuLink: '/d3-example/d3-041-csv' },
    { menuName: 'd3-042-csvFormat', menuLink: '/d3-example/d3-042-csvFormat' },
    { menuName: 'd3-043-csvFormatBody', menuLink: '/d3-example/d3-043-csvFormatBody' },
    { menuName: 'd3-044-csvFormatRow', menuLink: '/d3-example/d3-044-csvFormatRow' },
    { menuName: 'd3-045-csvFormatRows', menuLink: '/d3-example/d3-045-csvFormatRows' },
    { menuName: 'd3-046-csvFormatValue', menuLink: '/d3-example/d3-046-csvFormatValue' },
    { menuName: 'd3-047-csvParse', menuLink: '/d3-example/d3-047-csvParse' },
    { menuName: 'd3-048-csvParseRows', menuLink: '/d3-example/d3-048-csvParseRows' },
    { menuName: 'd3-049-cubehelix', menuLink: '/d3-example/d3-049-cubehelix' },
    { menuName: 'd3-050-cumsum', menuLink: '/d3-example/d3-050-cumsum' },
    { menuName: 'd3-051-curveBasis', menuLink: '/d3-example/d3-051-curveBasis' },
    { menuName: 'd3-052-curveBasisClosed', menuLink: '/d3-example/d3-052-curveBasisClosed' },
    { menuName: 'd3-053-curveBasisOpen', menuLink: '/d3-example/d3-053-curveBasisOpen' },
    { menuName: 'd3-054-curveBumpX', menuLink: '/d3-example/d3-054-curveBumpX' },
    { menuName: 'd3-055-curveBumpY', menuLink: '/d3-example/d3-055-curveBumpY' },
    { menuName: 'd3-056-curveBundle', menuLink: '/d3-example/d3-056-curveBundle' },
    { menuName: 'd3-057-curveCardinal', menuLink: '/d3-example/d3-057-curveCardinal' },
    { menuName: 'd3-058-curveCardinalClosed', menuLink: '/d3-example/d3-058-curveCardinalClosed' },
    { menuName: 'd3-059-curveCardinalOpen', menuLink: '/d3-example/d3-059-curveCardinalOpen' },
    { menuName: 'd3-060-curveCatmullRom', menuLink: '/d3-example/d3-060-curveCatmullRom' },
    { menuName: 'd3-061-curveCatmullRomClosed', menuLink: '/d3-example/d3-061-curveCatmullRomClosed' },
    { menuName: 'd3-062-curveCatmullRomOpen', menuLink: '/d3-example/d3-062-curveCatmullRomOpen' },
    { menuName: 'd3-063-curveLinear', menuLink: '/d3-example/d3-063-curveLinear' },
    { menuName: 'd3-064-curveLinearClosed', menuLink: '/d3-example/d3-064-curveLinearClosed' },
    { menuName: 'd3-065-curveMonotoneX', menuLink: '/d3-example/d3-065-curveMonotoneX' },
    { menuName: 'd3-066-curveMonotoneY', menuLink: '/d3-example/d3-066-curveMonotoneY' },
    { menuName: 'd3-067-curveNatural', menuLink: '/d3-example/d3-067-curveNatural' },
    { menuName: 'd3-068-curveStep', menuLink: '/d3-example/d3-068-curveStep' },
    { menuName: 'd3-069-curveStepAfter', menuLink: '/d3-example/d3-069-curveStepAfter' },
    { menuName: 'd3-070-curveStepBefore', menuLink: '/d3-example/d3-070-curveStepBefore' },
    { menuName: 'd3-071-descending', menuLink: '/d3-example/d3-071-descending' },
    { menuName: 'd3-072-deviation', menuLink: '/d3-example/d3-072-deviation' },
    { menuName: 'd3-073-difference', menuLink: '/d3-example/d3-073-difference' },
    { menuName: 'd3-074-disjoint', menuLink: '/d3-example/d3-074-disjoint' },
    { menuName: 'd3-075-dispatch', menuLink: '/d3-example/d3-075-dispatch' },
    { menuName: 'd3-076-drag', menuLink: '/d3-example/d3-076-drag' },
    { menuName: 'd3-077-dragDisable', menuLink: '/d3-example/d3-077-dragDisable' },
    { menuName: 'd3-078-dragEnable', menuLink: '/d3-example/d3-078-dragEnable' },
    { menuName: 'd3-079-dsv', menuLink: '/d3-example/d3-079-dsv' },
    { menuName: 'd3-080-dsvFormat', menuLink: '/d3-example/d3-080-dsvFormat' },
    { menuName: 'd3-081-easeBack', menuLink: '/d3-example/d3-081-easeBack' },
    { menuName: 'd3-082-easeBackIn', menuLink: '/d3-example/d3-082-easeBackIn' },
    { menuName: 'd3-083-easeBackInOut', menuLink: '/d3-example/d3-083-easeBackInOut' },
    { menuName: 'd3-084-easeBackOut', menuLink: '/d3-example/d3-084-easeBackOut' },
    { menuName: 'd3-085-easeBounce', menuLink: '/d3-example/d3-085-easeBounce' },
    { menuName: 'd3-086-easeBounceIn', menuLink: '/d3-example/d3-086-easeBounceIn' },
    { menuName: 'd3-087-easeBounceInOut', menuLink: '/d3-example/d3-087-easeBounceInOut' },
    { menuName: 'd3-088-easeBounceOut', menuLink: '/d3-example/d3-088-easeBounceOut' },
    { menuName: 'd3-089-easeCircle', menuLink: '/d3-example/d3-089-easeCircle' },
    { menuName: 'd3-090-easeCircleIn', menuLink: '/d3-example/d3-090-easeCircleIn' },
    { menuName: 'd3-091-easeCircleInOut', menuLink: '/d3-example/d3-091-easeCircleInOut' },
    { menuName: 'd3-092-easeCircleOut', menuLink: '/d3-example/d3-092-easeCircleOut' },
    { menuName: 'd3-093-easeCubic', menuLink: '/d3-example/d3-093-easeCubic' },
    { menuName: 'd3-094-easeCubicIn', menuLink: '/d3-example/d3-094-easeCubicIn' },
    { menuName: 'd3-095-easeCubicInOut', menuLink: '/d3-example/d3-095-easeCubicInOut' },
    { menuName: 'd3-096-easeCubicOut', menuLink: '/d3-example/d3-096-easeCubicOut' },
    { menuName: 'd3-097-easeElastic', menuLink: '/d3-example/d3-097-easeElastic' },
    { menuName: 'd3-098-easeElasticIn', menuLink: '/d3-example/d3-098-easeElasticIn' },
    { menuName: 'd3-099-easeElasticInOut', menuLink: '/d3-example/d3-099-easeElasticInOut' },
    { menuName: 'd3-100-easeElasticOut', menuLink: '/d3-example/d3-100-easeElasticOut' },
    { menuName: 'd3-101-easeExp', menuLink: '/d3-example/d3-101-easeExp' },
    { menuName: 'd3-102-easeExpIn', menuLink: '/d3-example/d3-102-easeExpIn' },
    { menuName: 'd3-103-easeExpInOut', menuLink: '/d3-example/d3-103-easeExpInOut' },
    { menuName: 'd3-104-easeExpOut', menuLink: '/d3-example/d3-104-easeExpOut' },
    { menuName: 'd3-105-easeLinear', menuLink: '/d3-example/d3-105-easeLinear' },
    { menuName: 'd3-106-easePoly', menuLink: '/d3-example/d3-106-easePoly' },
    { menuName: 'd3-107-easePolyIn', menuLink: '/d3-example/d3-107-easePolyIn' },
    { menuName: 'd3-108-easePolyInOut', menuLink: '/d3-example/d3-108-easePolyInOut' },
    { menuName: 'd3-109-easePolyOut', menuLink: '/d3-example/d3-109-easePolyOut' },
    { menuName: 'd3-110-easeQuad', menuLink: '/d3-example/d3-110-easeQuad' },
    { menuName: 'd3-111-easeQuadIn', menuLink: '/d3-example/d3-111-easeQuadIn' },
    { menuName: 'd3-112-easeQuadInOut', menuLink: '/d3-example/d3-112-easeQuadInOut' },
    { menuName: 'd3-113-easeQuadOut', menuLink: '/d3-example/d3-113-easeQuadOut' },
    { menuName: 'd3-114-easeSin', menuLink: '/d3-example/d3-114-easeSin' },
    { menuName: 'd3-115-easeSinIn', menuLink: '/d3-example/d3-115-easeSinIn' },
    { menuName: 'd3-116-easeSinInOut', menuLink: '/d3-example/d3-116-easeSinInOut' },
    { menuName: 'd3-117-easeSinOut', menuLink: '/d3-example/d3-117-easeSinOut' },
    { menuName: 'd3-118-every', menuLink: '/d3-example/d3-118-every' },
    { menuName: 'd3-119-extent', menuLink: '/d3-example/d3-119-extent' },
    { menuName: 'd3-120-fcumsum', menuLink: '/d3-example/d3-120-fcumsum' },
    { menuName: 'd3-121-filter', menuLink: '/d3-example/d3-121-filter' },
    { menuName: 'd3-122-flatGroup', menuLink: '/d3-example/d3-122-flatGroup' },
    { menuName: 'd3-123-flatRollup', menuLink: '/d3-example/d3-123-flatRollup' },
    { menuName: 'd3-124-forceCenter', menuLink: '/d3-example/d3-124-forceCenter' },
    { menuName: 'd3-125-forceCollide', menuLink: '/d3-example/d3-125-forceCollide' },
    { menuName: 'd3-126-forceLink', menuLink: '/d3-example/d3-126-forceLink' },
    { menuName: 'd3-127-forceManyBody', menuLink: '/d3-example/d3-127-forceManyBody' },
    { menuName: 'd3-128-forceRadial', menuLink: '/d3-example/d3-128-forceRadial' },
    { menuName: 'd3-129-forceSimulation', menuLink: '/d3-example/d3-129-forceSimulation' },
    { menuName: 'd3-130-forceX', menuLink: '/d3-example/d3-130-forceX' },
    { menuName: 'd3-131-forceY', menuLink: '/d3-example/d3-131-forceY' },
    { menuName: 'd3-132-format', menuLink: '/d3-example/d3-132-format' },
    { menuName: 'd3-133-formatDefaultLocale', menuLink: '/d3-example/d3-133-formatDefaultLocale' },
    { menuName: 'd3-134-formatLocale', menuLink: '/d3-example/d3-134-formatLocale' },
    { menuName: 'd3-135-formatPrefix', menuLink: '/d3-example/d3-135-formatPrefix' },
    { menuName: 'd3-136-formatSpecifier', menuLink: '/d3-example/d3-136-formatSpecifier' },
    { menuName: 'd3-137-fsum', menuLink: '/d3-example/d3-137-fsum' },
    { menuName: 'd3-138-geoAlbers', menuLink: '/d3-example/d3-138-geoAlbers' },
    { menuName: 'd3-139-geoAlbersUsa', menuLink: '/d3-example/d3-139-geoAlbersUsa' },
    { menuName: 'd3-140-geoArea', menuLink: '/d3-example/d3-140-geoArea' },
  ]);

  useEffect(() => {
    setTimeout(() => {
      setIsActiveTransition(true);
    }, 300);
  }, []);

  const menuItemClick = useCallback((item: ISideBar.MenuItem) => {
    router.push(item.menuLink);
  }, [router]);

  const mobileSideBarBackgroundClick = useCallback(() => {
    setCommonLayoutModeState('mobile-basic');
  }, [setCommonLayoutModeState]);

  const isMenuActive = useCallback((item: ISideBar.MenuItem) => {
    const asPath = router.asPath;
    const isActive = asPath.includes(item.menuLink);
    if (isActive && typeof document !== 'undefined') {
      const offsetTop = document.querySelector<HTMLElement>('.ul-menu-list')?.querySelector<HTMLElement>(`li[data-value=${item.menuName}]`)?.offsetTop;
      if (typeof offsetTop === 'number') {
        if (sideBarElementRef.current !== null) {
          sideBarElementRef.current.scrollTop = offsetTop;
        }
      }
    }
    return isActive;
  }, [router.asPath]);

  return (
    <>
      <div 
        className={[
          styles['side-bar-background'],
          styles[commonLayoutModeState],
          isActiveTransition ? styles['animation-duration'] : '',
        ].join(' ')}
        onClick={mobileSideBarBackgroundClick}></div>
      <div 
        ref={sideBarElementRef}
        className={[
          styles['side-bar'],
          styles[commonLayoutModeState],
          isActiveTransition ? styles['animation-duration'] : '',
        ].join(' ')}>
        <ul className={[
            'ul-menu-list',
            styles['menu-list']
          ].join(' ')}>
          {
            menuItems.map((item, index) => {
              return (
                <li 
                  key={index} 
                  className={[
                    styles['item'],
                    isMenuActive(item) ? styles['active'] : '',
                  ].join(' ')}
                  data-value={item.menuName}
                  onClick={e => menuItemClick(item)}>
                  { item.menuName }
                </li>
              )
            })
          }
        </ul>
      </div>
    </>
  );
};

export default SideBar;