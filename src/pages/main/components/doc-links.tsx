import { docLinksHeight } from '@pages/ws/constants'

export const DocLinks = () => (
  <div style={{ height: docLinksHeight }}>
    <div className="mb-4 pr-4">
      <div className="h-px bg-blue-secondary"></div>
    </div>

    <div className="text-14 text-blue-bright">
      <a
        href="https://foromeplatform.github.io/documentation/anfisa-user.v0.7/index.html"
        target="blank"
      >
        Anfisa User Documentation
      </a>
    </div>

    <div className="text-14 text-blue-bright">
      <a
        href="https://foromeplatform.github.io/documentation/anfisa-dev.v0.7/index.html"
        target="blank"
      >
        Anfisa Installation&Administration Documentation
      </a>
    </div>
  </div>
)
