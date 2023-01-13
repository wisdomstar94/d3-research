"use client"
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { commonLayoutModeStateAtom } from "../common-layout/common-layout.atom";
import styles from "./side-bar.component.module.scss";
import { ISideBar } from "./side-bar.interface";
import anime from 'animejs/lib/anime.es.js';

const SideBar = (props: ISideBar.Props) => {
  const sideBarElementRef = useRef<HTMLDivElement>(null);
  const [commonLayoutModeState, setCommonLayoutModeState] = useRecoilState(commonLayoutModeStateAtom);
  const [isActiveTransition, setIsActiveTransition] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
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
    { menuName: 'd3-141-geoAzimuthalEqualArea', menuLink: '/d3-example/d3-141-geoAzimuthalEqualArea' },
    { menuName: 'd3-142-geoAzimuthalEqualAreaRaw', menuLink: '/d3-example/d3-142-geoAzimuthalEqualAreaRaw' },
    { menuName: 'd3-143-geoAzimuthalEquidistant', menuLink: '/d3-example/d3-143-geoAzimuthalEquidistant' },
    { menuName: 'd3-144-geoAzimuthalEquidistantRaw', menuLink: '/d3-example/d3-144-geoAzimuthalEquidistantRaw' },
    { menuName: 'd3-145-geoBounds', menuLink: '/d3-example/d3-145-geoBounds' },
    { menuName: 'd3-146-geoCentroid', menuLink: '/d3-example/d3-146-geoCentroid' },
    { menuName: 'd3-147-geoCircle', menuLink: '/d3-example/d3-147-geoCircle' },
    { menuName: 'd3-148-geoClipAntimeridian', menuLink: '/d3-example/d3-148-geoClipAntimeridian' },
    { menuName: 'd3-149-geoClipCircle', menuLink: '/d3-example/d3-149-geoClipCircle' },
    { menuName: 'd3-150-geoClipRectangle', menuLink: '/d3-example/d3-150-geoClipRectangle' },
    { menuName: 'd3-151-geoConicConformal', menuLink: '/d3-example/d3-151-geoConicConformal' },
    { menuName: 'd3-152-geoConicConformalRaw', menuLink: '/d3-example/d3-152-geoConicConformalRaw' },
    { menuName: 'd3-153-geoConicEqualArea', menuLink: '/d3-example/d3-153-geoConicEqualArea' },
    { menuName: 'd3-154-geoConicEqualAreaRaw', menuLink: '/d3-example/d3-154-geoConicEqualAreaRaw' },
    { menuName: 'd3-155-geoConicEquidistant', menuLink: '/d3-example/d3-155-geoConicEquidistant' },
    { menuName: 'd3-156-geoConicEquidistantRaw', menuLink: '/d3-example/d3-156-geoConicEquidistantRaw' },
    { menuName: 'd3-157-geoContains', menuLink: '/d3-example/d3-157-geoContains' },
    { menuName: 'd3-158-geoDistance', menuLink: '/d3-example/d3-158-geoDistance' },
    { menuName: 'd3-159-geoEqualEarth', menuLink: '/d3-example/d3-159-geoEqualEarth' },
    { menuName: 'd3-160-geoEqualEarthRaw', menuLink: '/d3-example/d3-160-geoEqualEarthRaw' },
    { menuName: 'd3-161-geoEquirectangular', menuLink: '/d3-example/d3-161-geoEquirectangular' },
    { menuName: 'd3-162-geoEquirectangularRaw', menuLink: '/d3-example/d3-162-geoEquirectangularRaw' },
    { menuName: 'd3-163-geoGnomonic', menuLink: '/d3-example/d3-163-geoGnomonic' },
    { menuName: 'd3-164-geoGnomonicRaw', menuLink: '/d3-example/d3-164-geoGnomonicRaw' },
    { menuName: 'd3-165-geoGraticule', menuLink: '/d3-example/d3-165-geoGraticule' },
    { menuName: 'd3-166-geoGraticule10', menuLink: '/d3-example/d3-166-geoGraticule10' },
    { menuName: 'd3-167-geoIdentity', menuLink: '/d3-example/d3-167-geoIdentity' },
    { menuName: 'd3-168-geoInterpolate', menuLink: '/d3-example/d3-168-geoInterpolate' },
    { menuName: 'd3-169-geoLength', menuLink: '/d3-example/d3-169-geoLength' },
    { menuName: 'd3-170-geoMercator', menuLink: '/d3-example/d3-170-geoMercator' },
    { menuName: 'd3-171-geoMercatorRaw', menuLink: '/d3-example/d3-171-geoMercatorRaw' },
    { menuName: 'd3-172-geoNaturalEarth1', menuLink: '/d3-example/d3-172-geoNaturalEarth1' },
    { menuName: 'd3-173-geoNaturalEarth1Raw', menuLink: '/d3-example/d3-173-geoNaturalEarth1Raw' },
    { menuName: 'd3-174-geoOrthographic', menuLink: '/d3-example/d3-174-geoOrthographic' },
    { menuName: 'd3-175-geoOrthographicRaw', menuLink: '/d3-example/d3-175-geoOrthographicRaw' },
    { menuName: 'd3-176-geoPath', menuLink: '/d3-example/d3-176-geoPath' },
    { menuName: 'd3-177-geoProjection', menuLink: '/d3-example/d3-177-geoProjection' },
    { menuName: 'd3-178-geoProjectionMutator', menuLink: '/d3-example/d3-178-geoProjectionMutator' },
    { menuName: 'd3-179-geoRotation', menuLink: '/d3-example/d3-179-geoRotation' },
    { menuName: 'd3-180-geoStereographic', menuLink: '/d3-example/d3-180-geoStereographic' },
    { menuName: 'd3-181-geoStereographicRaw', menuLink: '/d3-example/d3-181-geoStereographicRaw' },
    { menuName: 'd3-182-geoStream', menuLink: '/d3-example/d3-182-geoStream' },
    { menuName: 'd3-183-geoTransform', menuLink: '/d3-example/d3-183-geoTransform' },
    { menuName: 'd3-184-geoTransverseMercator', menuLink: '/d3-example/d3-184-geoTransverseMercator' },
    { menuName: 'd3-185-geoTransverseMercatorRaw', menuLink: '/d3-example/d3-185-geoTransverseMercatorRaw' },
    { menuName: 'd3-186-gray', menuLink: '/d3-example/d3-186-gray' },
    { menuName: 'd3-187-greatest', menuLink: '/d3-example/d3-187-greatest' },
    { menuName: 'd3-188-greatestIndex', menuLink: '/d3-example/d3-188-greatestIndex' },
    { menuName: 'd3-189-group', menuLink: '/d3-example/d3-189-group' },
    { menuName: 'd3-190-groupSort', menuLink: '/d3-example/d3-190-groupSort' },
    { menuName: 'd3-191-groups', menuLink: '/d3-example/d3-191-groups' },
    { menuName: 'd3-192-hcl', menuLink: '/d3-example/d3-192-hcl' },
    { menuName: 'd3-193-hierarchy', menuLink: '/d3-example/d3-193-hierarchy' },
    { menuName: 'd3-194-hsl', menuLink: '/d3-example/d3-194-hsl' },
    { menuName: 'd3-195-html', menuLink: '/d3-example/d3-195-html' },
    { menuName: 'd3-196-image', menuLink: '/d3-example/d3-196-image' },
    { menuName: 'd3-197-index', menuLink: '/d3-example/d3-197-index' },
    { menuName: 'd3-198-indexes', menuLink: '/d3-example/d3-198-indexes' },
    { menuName: 'd3-199-interpolate', menuLink: '/d3-example/d3-199-interpolate' },
    { menuName: 'd3-200-interpolateArray', menuLink: '/d3-example/d3-200-interpolateArray' },
    { menuName: 'd3-201-interpolateBasis', menuLink: '/d3-example/d3-201-interpolateBasis' },
    { menuName: 'd3-202-interpolateBasisClosed', menuLink: '/d3-example/d3-202-interpolateBasisClosed' },
    { menuName: 'd3-203-interpolateBlues', menuLink: '/d3-example/d3-203-interpolateBlues' },
    { menuName: 'd3-204-interpolateBrBG', menuLink: '/d3-example/d3-204-interpolateBrBG' },
    { menuName: 'd3-205-interpolateBuGn', menuLink: '/d3-example/d3-205-interpolateBuGn' },
    { menuName: 'd3-206-interpolateBuPu', menuLink: '/d3-example/d3-206-interpolateBuPu' },
    { menuName: 'd3-207-interpolateCividis', menuLink: '/d3-example/d3-207-interpolateCividis' },
    { menuName: 'd3-208-interpolateCool', menuLink: '/d3-example/d3-208-interpolateCool' },
    { menuName: 'd3-209-interpolateCubehelix', menuLink: '/d3-example/d3-209-interpolateCubehelix' },
    { menuName: 'd3-210-interpolateCubehelixDefault', menuLink: '/d3-example/d3-210-interpolateCubehelixDefault' },
    { menuName: 'd3-211-interpolateCubehelixLong', menuLink: '/d3-example/d3-211-interpolateCubehelixLong' },
    { menuName: 'd3-212-interpolateDate', menuLink: '/d3-example/d3-212-interpolateDate' },
    { menuName: 'd3-213-interpolateDiscrete', menuLink: '/d3-example/d3-213-interpolateDiscrete' },
    { menuName: 'd3-214-interpolateGnBu', menuLink: '/d3-example/d3-214-interpolateGnBu' },
    { menuName: 'd3-215-interpolateGreens', menuLink: '/d3-example/d3-215-interpolateGreens' },
    { menuName: 'd3-216-interpolateGreys', menuLink: '/d3-example/d3-216-interpolateGreys' },
    { menuName: 'd3-217-interpolateHcl', menuLink: '/d3-example/d3-217-interpolateHcl' },
    { menuName: 'd3-218-interpolateHclLong', menuLink: '/d3-example/d3-218-interpolateHclLong' },
    { menuName: 'd3-219-interpolateHsl', menuLink: '/d3-example/d3-219-interpolateHsl' },
    { menuName: 'd3-220-interpolateHslLong', menuLink: '/d3-example/d3-220-interpolateHslLong' },
    { menuName: 'd3-221-interpolateHue', menuLink: '/d3-example/d3-221-interpolateHue' },
    { menuName: 'd3-222-interpolateInferno', menuLink: '/d3-example/d3-222-interpolateInferno' },
    { menuName: 'd3-223-interpolateLab', menuLink: '/d3-example/d3-223-interpolateLab' },
    { menuName: 'd3-224-interpolateMagma', menuLink: '/d3-example/d3-224-interpolateMagma' },
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
    const asPath = pathname;
    const isActive = asPath?.includes(item.menuLink);
    if (isActive && typeof document !== 'undefined') {
      const offsetTop = document.querySelector<HTMLElement>('.ul-menu-list')?.querySelector<HTMLElement>(`li[data-value=${item.menuName}]`)?.offsetTop;
      if (typeof offsetTop === 'number') {
        if (sideBarElementRef.current !== null) {
          // sideBarElementRef.current.scrollTop = offsetTop;
          anime({
            targets: [sideBarElementRef.current],
            scrollTop: offsetTop - 140,
            easing: 'easeOutQuint',
            duration: 400,
          });
        }
      }
    }
    return isActive;
  }, [pathname]);

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