import { useCallback, useRef, useState } from "react";
import { useScrollProgress } from "../../../hooks/useScrollProgress";
import { formatCurrency } from "../../../utils/formatters";
import { INITIAL_MENU_ITEMS } from "../services/menuService";
import type { MenuItem } from "../types/menuTypes";
import styles from "./HeroBestsellersInfinite.module.css";

const POSTERS: Record<string, string[]> = {
  "sb-pizza-01": ["PANEER", "Tikka", "PIZZA"],
  "sb-aloo-tikki": ["ALOO", "Tikki", "BURGER"],
  "sb-hot-honey-paneer": ["CRISPY", "Hot Honey", "PANEER"],
  "sb-05": ["LOADED", "Truffle", "FRIES"],
  "sb-08": ["SALTED", "Caramel", "BROWNIE"],
};

export function HeroBestsellersInfinite({
  items = INITIAL_MENU_ITEMS,
  initialItemId,
  onAddToCart,
}: {
  items?: MenuItem[];
  initialItemId?: string;
  onAddToCart: (item: MenuItem) => void;
}) {
  const bestsellers = items.filter((item) => item.isPopular).slice(0, 5);
  const start = Math.max(
    0,
    bestsellers.findIndex((item) => item.id === initialItemId),
  );
  const [selected, setSelected] = useState(start);
  const track = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const pointer = useRef<number | null>(null);
  const scroll = useCallback(
    (progress: number) => {
      setSelected(
        (start + Math.round(progress * (bestsellers.length - 1))) %
          bestsellers.length,
      );
    },
    [start, bestsellers.length],
  );
  useScrollProgress(track, stage, scroll);

  return (
    <section
      ref={track}
      className={styles.heroWindow}
      aria-label="Featured dishes"
    >
      <div
        className={styles.stageWrapper}
        ref={stage}
        onPointerDown={(event) => {
          pointer.current = event.clientX;
        }}
        onPointerUp={(event) => {
          if (
            pointer.current !== null &&
            Math.abs(event.clientX - pointer.current) > 50
          ) {
            const direction = event.clientX < pointer.current ? 1 : -1;
            setSelected(
              (value) =>
                (value + direction + bestsellers.length) % bestsellers.length,
            );
          }
          pointer.current = null;
        }}
        onPointerCancel={() => {
          pointer.current = null;
        }}
      >
        <div className={styles.ambientGlow} />
        <div className={styles.floorShadow} />
        <div className={styles.carouselStage}>
          {bestsellers.map((item, index) => {
            let offset = index - selected;
            if (offset > bestsellers.length / 2) offset -= bestsellers.length;
            if (offset < -bestsellers.length / 2) offset += bestsellers.length;
            const active = offset === 0;
            const visible = Math.abs(offset) <= 1;
            const title = POSTERS[item.id] ?? ["SOUL", "Kitchen", item.name];
            return (
              <article
                key={item.id}
                className={`${styles.card3D} ${active ? styles.cardActive : styles.cardSide}`}
                aria-hidden={!visible}
                style={{
                  transform: `translate(-50%, -50%) translateX(${offset * 83}%) scale(${active ? 1 : 0.78}) rotateY(${offset * -18}deg)`,
                  opacity: active ? 1 : visible ? 0.35 : 0,
                  visibility: visible ? "visible" : "hidden",
                  zIndex: active ? 2 : 1,
                }}
              >
                {visible && !active && (
                  <button
                    className={styles.cardSideOverlay}
                    aria-label={`Explore ${item.name}`}
                    onClick={() => setSelected(index)}
                  />
                )}
                <div className={styles.watermarkText} aria-hidden="true">
                  {title.map((word) => (
                    <span key={word} className={styles.watermarkWord}>
                      {word}
                    </span>
                  ))}
                </div>
                <div className={styles.contentArea}>
                  <h3 className={styles.titleGroup}>
                    <span className={styles.titleLine1}>{title[0]}</span>
                    <span className={styles.titleScriptLine}>{title[1]}</span>
                    <span className={styles.titleLine2}>{title[2]}</span>
                  </h3>
                  <p className={styles.cardDescription}>{item.description}</p>
                  {active && (
                    <button
                      type="button"
                      className={styles.ctaWrapper}
                      onClick={() => onAddToCart(item)}
                      aria-label={`Add to cart: ${item.name}`}
                    >
                      <span className={styles.ctaText}>ADD TO CART</span>
                    </button>
                  )}
                </div>
                <div className={styles.productArea}>
                  <div className={styles.dishFrame}>
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className={styles.productImage}
                      draggable={false}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.speechBubblePrice}>
                    <span>{formatCurrency(item.price)}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
