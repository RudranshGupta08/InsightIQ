function AnalyticsCard({

  icon,

  title,

  subtitle,

  action,

  className = "",

  children,

}) {

  return (

    <div
      className={`
        bg-zinc-950
        border
        border-zinc-800
        rounded-3xl
        p-6
        shadow-sm
        hover:border-zinc-700
        transition-all
        duration-300
        ${className}
      `}
    >

      {(title || subtitle || action) && (

        <div className="flex items-start justify-between mb-6">

          <div className="flex items-center gap-3">

    {icon && (

        <div
            className="
                w-11
                h-11
                rounded-xl
                bg-violet-500/10
                flex
                items-center
                justify-center
                text-violet-400
            "
        >

            {icon}

        </div>

    )}

    <div>

        {title && (

            <h2 className="text-xl font-semibold">

                {title}

            </h2>

        )}

        {subtitle && (

            <p className="text-sm text-zinc-500 mt-1">

                {subtitle}

            </p>

        )}

    </div>

</div>
          {action && (

            <div>

              {action}

            </div>

          )}

        </div>

      )}

      {children}

    </div>

  );

}

export default AnalyticsCard;